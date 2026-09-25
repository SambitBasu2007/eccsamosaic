import { ASSETS } from "@/lib/assets";

export type DebrisConfig = {
  id: string;
  /** Path into the shared assets folder. */
  src: string;
  /** Rendered size in px, at the reference container width. */
  size: number;
  /** Start position as a fraction of the container, measured at the rock's centre. */
  start: { x: number; y: number };
  /** Direction of travel; normalised at runtime. */
  direction: { x: number; y: number };
  /** Drift speed in px per second — ambient, not a game. */
  speed: number;
  /** Starting tilt in degrees. */
  angle: number;
  /** Tumble rate in degrees per second. */
  spin: number;
  opacity: number;
  brightness: number;
};

/**
 * The opaque region of the rock artwork, as fractions of the source image.
 *
 * `rocky.png` is 500x500 but the asteroid only occupies part of that frame, with
 * transparent padding around it. Collision uses this box rather than the image
 * box, so a rock visually kisses the wall and the title instead of stopping
 * short. Re-measure this if you swap in artwork with different padding.
 */
export const ROCK_SOURCE_CONTENT = {
  left: 0.104,
  top: 0.05,
  right: 0.952,
  bottom: 0.86,
} as const;

/** Extra clearance kept between a rock and the title box, in px. */
export const DEBRIS_MARGIN = 20;

/** Container width the configured `size` values were tuned against. */
export const DEBRIS_REFERENCE_WIDTH = 1180;

/**
 * Keep this list short — 2 to 4 rocks. Every entry is one more element moved
 * every animation frame, and the composition reads better sparse.
 *
 * Varied size, opacity and brightness fake depth without any expensive blur.
 */
export const DEBRIS_CONFIG: readonly DebrisConfig[] = [
  {
    id: "debris-a",
    src: ASSETS.debris.rock,
    size: 148,
    start: { x: 0.17, y: 0.26 },
    direction: { x: 1, y: 0.55 },
    speed: 21,
    angle: -14,
    spin: 5.5,
    opacity: 0.85,
    brightness: 0.95,
  },
  {
    id: "debris-b",
    src: ASSETS.debris.rock,
    size: 92,
    start: { x: 0.81, y: 0.34 },
    direction: { x: -0.8, y: 1 },
    speed: 15,
    angle: 26,
    spin: -7,
    opacity: 0.58,
    brightness: 0.78,
  },
  {
    id: "debris-c",
    src: ASSETS.debris.rock,
    size: 62,
    start: { x: 0.66, y: 0.78 },
    direction: { x: 1, y: -0.85 },
    speed: 12,
    angle: 42,
    spin: 9,
    opacity: 0.42,
    brightness: 0.66,
  },
  {
    id: "debris-d",
    src: ASSETS.debris.rock,
    size: 118,
    start: { x: 0.26, y: 0.72 },
    direction: { x: -1, y: -0.5 },
    speed: 18,
    angle: -38,
    spin: -4.5,
    opacity: 0.7,
    brightness: 0.86,
  },
];
