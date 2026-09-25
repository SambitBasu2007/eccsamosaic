"use client";

import { useEffect, useLayoutEffect, type RefObject } from "react";

import {
  DEBRIS_CONFIG,
  DEBRIS_MARGIN,
  DEBRIS_REFERENCE_WIDTH,
  ROCK_SOURCE_CONTENT,
  type DebrisConfig,
} from "./debris.config";

type Rect = { left: number; top: number; right: number; bottom: number };

type Rock = {
  cfg: DebrisConfig;
  el: HTMLImageElement;
  /** Rendered edge length, scaled for the current container width. */
  size: number;
  /** Centre of the rock's *visible content*, in container px. */
  cx: number;
  cy: number;
  /** Current velocity in px per second. */
  vx: number;
  vy: number;
  /** Velocity the rock is easing toward; only differs mid-bounce. */
  avx: number;
  avy: number;
  /** Degrees, and degrees per second. */
  angle: number;
  spin: number;
};

type Options = {
  /** The debris layer itself; its own ref is always attached before this runs. */
  layerRef: RefObject<HTMLDivElement | null>;
  /** Freeze the rocks in a fixed ambient arrangement instead of drifting. */
  reducedMotion: boolean;
};

/**
 * The hero section carries this attribute, and is therefore the wall bounds.
 *
 * Both are looked up from the DOM rather than threaded down as refs: a parent's
 * ref is attached *after* its children's layout effects run, so a `boundsRef`
 * passed into this component would still be null when the engine starts.
 */
const BOUNDS_SELECTOR = "[data-debris-bounds]";

/** Elements marked with this attribute behave as solid obstacles. */
const OBSTACLE_SELECTOR = "[data-debris-obstacle]";

const DEG = Math.PI / 180;

/** Caps the per-frame step so a backgrounded tab never teleports a rock. */
const MAX_DELTA_SECONDS = 1 / 20;

/** Below this width change we keep the rocks in flight instead of re-seeding. */
const RELAYOUT_THRESHOLD = 0.15;

/**
 * Time constant for the eased turn after a bounce, in seconds. The rock leaves
 * the surface at a standstill on the affected axis and reaches its new heading
 * over roughly three of these.
 */
const TURN_TAU = 0.18;

const CONTENT_W = ROCK_SOURCE_CONTENT.right - ROCK_SOURCE_CONTENT.left;
const CONTENT_H = ROCK_SOURCE_CONTENT.bottom - ROCK_SOURCE_CONTENT.top;
const CONTENT_CX = (ROCK_SOURCE_CONTENT.left + ROCK_SOURCE_CONTENT.right) / 2;
const CONTENT_CY = (ROCK_SOURCE_CONTENT.top + ROCK_SOURCE_CONTENT.bottom) / 2;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

/** Layout effects run before paint, so the first placement never flashes. */
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/** Rotated AABB half-extents of a rock's visible content. */
function halfExtents(rock: Rock) {
  const rad = rock.angle * DEG;
  const cos = Math.abs(Math.cos(rad));
  const sin = Math.abs(Math.sin(rad));
  const hw = (rock.size * CONTENT_W) / 2;
  const hh = (rock.size * CONTENT_H) / 2;
  return { hx: hw * cos + hh * sin, hy: hw * sin + hh * cos };
}

/** Obstacle boxes in container coordinates, each padded by the clearance margin. */
function measureObstacles(container: HTMLElement, obstacles: Element[]): Rect[] {
  const box = container.getBoundingClientRect();
  const rects: Rect[] = [];
  obstacles.forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    rects.push({
      left: rect.left - box.left - DEBRIS_MARGIN,
      top: rect.top - box.top - DEBRIS_MARGIN,
      right: rect.right - box.left + DEBRIS_MARGIN,
      bottom: rect.bottom - box.top + DEBRIS_MARGIN,
    });
  });
  return rects;
}

/**
 * Ambient debris drift.
 *
 * Each rock drifts at a constant speed and turns away when it meets a hero wall
 * or a solid obstacle — the classic bouncing-ball simulation, except the turn is
 * eased over a fraction of a second instead of snapping the velocity, so bounces
 * read as gravity rather than as a collision. Movement is written as one
 * `translate3d(...) rotate(...)` transform per rock per frame, so nothing ever
 * touches layout or paint.
 */
export default function useDebrisPhysics({ layerRef, reducedMotion }: Options) {
  useIsomorphicLayoutEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const elements = layer.querySelectorAll<HTMLImageElement>(".debris__rock");
    if (elements.length === 0) return;

    // The layer is inset:0 over the hero, so it is an exact stand-in for the
    // bounds if the attribute is ever missing.
    const bounds = layer.closest<HTMLElement>(BOUNDS_SELECTOR) ?? layer;

    let active = true;
    let width = 0;
    let height = 0;
    let scale = 1;
    let placed = false;
    let obstacles: Rect[] = [];
    /** Rocks that are actually visible, i.e. within the current motion budget. */
    let moverocks: Rock[] = [];
    let frame = 0;
    let running = false;
    let lastTime = 0;

    const rocks: Rock[] = Array.from(elements).map((el, index) => {
      const cfg = DEBRIS_CONFIG[index % DEBRIS_CONFIG.length];
      return {
        cfg,
        el,
        size: cfg.size,
        cx: cfg.size / 2,
        cy: cfg.size / 2,
        vx: 0,
        vy: 0,
        avx: 0,
        avy: 0,
        angle: cfg.angle,
        spin: cfg.spin,
      };
    });

    /** Position the element so its *visible content* centre lands on (cx, cy). */
    const render = (rock: Rock) => {
      const x = rock.cx - CONTENT_CX * rock.size;
      const y = rock.cy - CONTENT_CY * rock.size;
      rock.el.style.transform =
        `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${rock.angle.toFixed(2)}deg)`;
    };

    /** Keep the content box inside the container on every axis. */
    const clampToBounds = (rock: Rock) => {
      const { hx, hy } = halfExtents(rock);
      rock.cx = clamp(rock.cx, hx, Math.max(hx, width - hx));
      rock.cy = clamp(rock.cy, hy, Math.max(hy, height - hy));
    };

    /**
     * Turn a rock away from a surface.
     *
     * The travelling component is zeroed rather than mirrored outright and the
     * heading change goes into the target velocity, which `step` eases toward.
     * That is what stops bounces reading as instant billiard-ball reversals, and
     * keeping the component at zero — never inward — means the surface cannot
     * re-trigger while the turn plays out.
     */
    const bounceAxis = (rock: Rock, axis: "x" | "y", direction: 1 | -1) => {
      if (axis === "x") {
        rock.vx = 0;
        rock.avx = Math.abs(rock.avx) * direction;
      } else {
        rock.vy = 0;
        rock.avy = Math.abs(rock.avy) * direction;
      }
    };

    /**
     * Place the rock clear of a box on one axis, then turn it away.
     * `edge` is the box edge being escaped, so the centre sits one half-extent
     * away from it.
     */
    const resolveAxis = (rock: Rock, axis: "x" | "y", edge: number, fromStart: boolean) => {
      const { hx, hy } = halfExtents(rock);
      if (axis === "x") {
        rock.cx = fromStart ? edge - hx : edge + hx;
      } else {
        rock.cy = fromStart ? edge - hy : edge + hy;
      }
      bounceAxis(rock, axis, fromStart ? -1 : 1);
    };

    /**
     * Reverse whichever axis has the smaller overlap, then push clear.
     *
     * An escape is only used if the whole rock fits on the far side of it: on a
     * narrow screen the gap either side of the title can be thinner than a rock,
     * and resolving that way leaves it pinned against the wall *still* inside the
     * box, retrying forever. When that happens the rock is sent out of the top or
     * bottom instead, which always has room.
     */
    const pushOutOfObstacles = (rock: Rock) => {
      const { hx, hy } = halfExtents(rock);
      obstacles.forEach((obstacle) => {
        const overlapX =
          Math.min(rock.cx + hx, obstacle.right) - Math.max(rock.cx - hx, obstacle.left);
        const overlapY =
          Math.min(rock.cy + hy, obstacle.bottom) - Math.max(rock.cy - hy, obstacle.top);
        if (overlapX <= 0 || overlapY <= 0) return;

        const fromLeft = rock.cx < (obstacle.left + obstacle.right) / 2;
        const fromTop = rock.cy < (obstacle.top + obstacle.bottom) / 2;

        // Targets are given as the rock's centre, padded onto the box edges.
        const xTarget = fromLeft ? obstacle.left : obstacle.right;
        const yTarget = fromTop ? obstacle.top : obstacle.bottom;
        const xFits = xTarget - 2 * hx >= 0 && xTarget + 2 * hx <= width;
        const yFits = yTarget - 2 * hy >= 0 && yTarget + 2 * hy <= height;
        if (!xFits && !yFits) return; // Nowhere valid to go; leave it drifting.

        if (overlapX <= overlapY ? xFits : !yFits) {
          resolveAxis(rock, "x", fromLeft ? obstacle.left : obstacle.right, fromLeft);
        } else {
          resolveAxis(rock, "y", fromTop ? obstacle.top : obstacle.bottom, fromTop);
        }
      });
    };

    const sizeRocks = () => {
      rocks.forEach((rock) => {
        rock.size = Math.max(30, rock.cfg.size * scale);
        rock.el.style.width = `${rock.size}px`;
        rock.el.style.height = `${rock.size}px`;
      });
    };

    /** Fresh placement from the config — used on start-up and real reflows. */
    const seed = () => {
      sizeRocks();
      rocks.forEach((rock) => {
        const length = Math.hypot(rock.cfg.direction.x, rock.cfg.direction.y) || 1;
        rock.vx = (rock.cfg.direction.x / length) * rock.cfg.speed * scale;
        rock.vy = (rock.cfg.direction.y / length) * rock.cfg.speed * scale;
        rock.avx = rock.vx;
        rock.avy = rock.vy;
        rock.angle = rock.cfg.angle;
        rock.spin = rock.cfg.spin;

        const { hx, hy } = halfExtents(rock);
        rock.cx = clamp(rock.cfg.start.x * width, hx, Math.max(hx, width - hx));
        rock.cy = clamp(rock.cfg.start.y * height, hy, Math.max(hy, height - hy));

        // Never start life buried in an obstacle.
        pushOutOfObstacles(rock);
        clampToBounds(rock);
        render(rock);
      });
      placed = true;
    };

    const measure = () => {
      if (!active) return;

      const nextWidth = bounds.clientWidth;
      const nextHeight = bounds.clientHeight;
      const widthShift = width > 0 ? Math.abs(nextWidth - width) / width : 1;

      width = nextWidth;
      height = nextHeight;
      scale = clamp(width / DEBRIS_REFERENCE_WIDTH, 0.55, 1.15);
      obstacles = measureObstacles(
        bounds,
        Array.from(bounds.querySelectorAll(OBSTACLE_SELECTOR)),
      );

      // Motion budget: the stylesheet hides the extra rocks on small screens to
      // protect mobile GPUs, and the engine honours that by not stepping them.
      moverocks = rocks.filter((rock) => rock.el.offsetParent !== null);

      if (!placed || widthShift > RELAYOUT_THRESHOLD) {
        seed();
        return;
      }

      // Minor resize (mobile URL bar, font swap, etc.): keep the drift going,
      // just resize the rocks and settle them back out of the walls and boxes.
      // A font swap can grow the title, so a rock parked outside the old box has
      // to be moved rather than left overlapping until the next frame.
      sizeRocks();
      rocks.forEach((rock) => {
        clampToBounds(rock);
        pushOutOfObstacles(rock);
        clampToBounds(rock);
        render(rock);
      });
    };

    const step = (rock: Rock, delta: number) => {
      // Ease the velocity toward the heading set by the last bounce.
      if (rock.vx !== rock.avx || rock.vy !== rock.avy) {
        const k = 1 - Math.exp(-delta / TURN_TAU);
        rock.vx += (rock.avx - rock.vx) * k;
        rock.vy += (rock.avy - rock.vy) * k;
        if (Math.abs(rock.avx - rock.vx) < 0.4 && Math.abs(rock.avy - rock.vy) < 0.4) {
          rock.vx = rock.avx;
          rock.vy = rock.avy;
        }
      }

      rock.cx += rock.vx * delta;
      rock.cy += rock.vy * delta;
      rock.angle += rock.spin * delta;

      const { hx, hy } = halfExtents(rock);

      if (rock.cx - hx < 0) {
        rock.cx = hx;
        bounceAxis(rock, "x", 1);
      } else if (rock.cx + hx > width) {
        rock.cx = width - hx;
        bounceAxis(rock, "x", -1);
      }

      if (rock.cy - hy < 0) {
        rock.cy = hy;
        bounceAxis(rock, "y", 1);
      } else if (rock.cy + hy > height) {
        rock.cy = height - hy;
        bounceAxis(rock, "y", -1);
      }

      // Obstacles are solid: bounce off them, then make sure the correction did
      // not shove the rock through a wall.
      pushOutOfObstacles(rock);
      clampToBounds(rock);
      render(rock);
    };

    const tick = (now: number) => {
      if (!running) return;
      const delta = Math.min((now - lastTime) / 1000, MAX_DELTA_SECONDS);
      lastTime = now;
      moverocks.forEach((rock) => step(rock, delta));
      frame = window.requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || reducedMotion || !active) return;
      running = true;
      lastTime = performance.now();
      frame = window.requestAnimationFrame(tick);
    };

    const stop = () => {
      running = false;
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
    };

    measure();

    // Reduced motion keeps the rocks on screen as atmosphere, but frozen: no
    // drift, no tumble, no animation frame loop.
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(bounds);
    bounds.querySelectorAll(OBSTACLE_SELECTOR).forEach((el) => resizeObserver.observe(el));

    // Obstacle boxes change once Cindie Mono swaps in over the fallback stack.
    document.fonts?.ready.then(measure).catch(() => undefined);

    let visibility: IntersectionObserver | null = null;
    if (!reducedMotion) {
      // A hero that is scrolled off-screen needs no physics.
      visibility = new IntersectionObserver(
        ([entry]) => (entry.isIntersecting ? start() : stop()),
        { threshold: 0 },
      );
      visibility.observe(bounds);
    }

    const onWindowResize = () => measure();
    window.addEventListener("resize", onWindowResize);

    return () => {
      active = false;
      stop();
      resizeObserver.disconnect();
      visibility?.disconnect();
      window.removeEventListener("resize", onWindowResize);
    };
  }, [layerRef, reducedMotion]);
}
