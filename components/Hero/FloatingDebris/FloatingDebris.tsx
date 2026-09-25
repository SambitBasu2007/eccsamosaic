"use client";

import { useRef } from "react";

import useReducedMotion from "@/hooks/useReducedMotion";

import { DEBRIS_CONFIG, type DebrisConfig } from "./debris.config";
import useDebrisPhysics from "./useDebrisPhysics";

import "./FloatingDebris.css";

/**
 * Pre-hydration placement.
 *
 * The hero is full-viewport, so viewport units land within a few pixels of the
 * real container position. That means the rocks never sit visibly wrong in the
 * first paint; the physics hook then takes over and corrects them exactly.
 */
function initialTransform(rock: DebrisConfig) {
  const x = `calc(${(rock.start.x * 100).toFixed(3)}vw - ${rock.size / 2}px)`;
  const y = `calc(${(rock.start.y * 100).toFixed(3)}vh - ${rock.size / 2}px)`;
  return `translate3d(${x}, ${y}, 0) rotate(${rock.angle}deg)`;
}

/**
 * Rocky debris drifting through the hero.
 *
 * Purely decorative atmosphere, so the whole layer is hidden from assistive
 * tech and takes no pointer events. The engine locates the hero (the wall
 * bounds) and the title (a solid obstacle) from the committed DOM by their data
 * attributes; see `useDebrisPhysics` for why refs are not threaded down.
 */
export default function FloatingDebris() {
  const layerRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  useDebrisPhysics({ layerRef, reducedMotion });

  return (
    <div className="debris" ref={layerRef} aria-hidden="true">
      {DEBRIS_CONFIG.map((rock) => (
        <img
          key={rock.id}
          className="debris__rock"
          src={rock.src}
          alt=""
          draggable={false}
          decoding="async"
          style={{
            width: rock.size,
            height: rock.size,
            opacity: rock.opacity,
            filter: `brightness(${rock.brightness})`,
            transform: initialTransform(rock),
          }}
        />
      ))}
    </div>
  );
}
