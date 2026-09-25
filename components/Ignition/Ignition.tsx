import type { CSSProperties } from "react";

import { ASSETS } from "@/lib/assets";
import { EVENT } from "@/lib/event";

import "./Ignition.css";

const PARTICLES = [
  [-42, -30, 4, 8.8, -2.1],
  [-34, -18, 3, 11.6, -6.4],
  [-27, -38, 5, 9.7, -4.8],
  [-18, -8, 3, 13.2, -8.7],
  [-9, -28, 4, 10.4, -1.9],
  [3, -39, 3, 12.8, -7.3],
  [14, -21, 5, 9.2, -3.6],
  [27, -34, 3, 14.1, -10.8],
  [39, -16, 4, 11.1, -5.5],
  [-46, 2, 3, 12.5, -4.2],
  [-36, 13, 5, 9.9, -8.1],
  [-24, 25, 3, 13.8, -2.8],
  [-12, 10, 4, 10.7, -6.9],
  [1, 24, 3, 15.2, -11.4],
  [13, 13, 5, 9.5, -5.1],
  [25, 29, 3, 12.1, -9.2],
  [37, 8, 4, 14.7, -1.2],
  [46, 25, 3, 10.2, -7.8],
  [-31, 42, 4, 13.4, -3.3],
  [-17, 36, 3, 9.1, -6.1],
  [-3, 43, 5, 11.8, -9.6],
  [11, 38, 3, 14.4, -4.7],
  [23, 45, 4, 10.9, -2.4],
  [35, 37, 3, 12.9, -8.9],
  [-48, -42, 3, 16.4, -4.1],
  [-43, 32, 5, 12.7, -10.2],
  [-29, 48, 3, 17.8, -6.5],
  [-6, -47, 4, 14.9, -12.4],
  [8, -46, 3, 18.6, -3.7],
  [19, 48, 5, 13.6, -9.8],
  [32, -46, 3, 16.9, -7.1],
  [48, 42, 4, 12.3, -2.9],
] as const;

const RED_CIRCLES = [
  [-43, -34, 3.5, 22, -8],
  [-31, -25, 7, 28, -17],
  [-17, -42, 4.5, 24, -5],
  [-2, -26, 9, 32, -21],
  [16, -38, 5.5, 26, -13],
  [33, -25, 8, 30, -25],
  [45, -4, 4, 21, -9],
  [-46, 8, 6, 29, -19],
  [-34, 19, 3.5, 25, -3],
  [-20, 7, 10, 34, -27],
  [-7, 20, 5, 23, -11],
  [9, 8, 7, 31, -18],
  [24, 24, 4, 27, -7],
  [39, 14, 9, 35, -23],
  [47, 34, 5, 24, -15],
  [-39, 43, 8, 33, -29],
  [-23, 35, 4, 26, -6],
  [-10, 46, 7, 30, -20],
  [5, 38, 3.5, 22, -12],
  [21, 44, 9, 36, -31],
  [37, 39, 5, 28, -16],
] as const;

/**
 * Ignition Sequence — section 02, the pinned scroll transition.
 *
 * Pure atmosphere: no informational content. The planet drifts down from above
 * while the astronaut rises from below, the red bloom builds, and the frame
 * commits to crimson — all scrubbed by a single scroll-progress value (0–1)
 * through one CSS scroll-driven animation on the track, so scrolling back up
 * reverses the scene exactly. No JavaScript, no timers, no per-scroll writes.
 *
 * Where `animation-timeline` is unsupported, or the visitor prefers reduced
 * motion, the section renders the final composed frame instead (see the base
 * values in Ignition.css).
 */
export default function Ignition() {
  return (
    <section
      className="section section--crisis ignition"
      id="ignition"
      aria-label={EVENT.ignition.marker}
    >
      <div className="ignition__track">
        <div className="ignition__stage">
          {/* Red ambient glow, behind the planet. */}
          <div className="ignition__glow" aria-hidden="true" />

          {/* Planet enters from above, astronaut from below; both centred and
              sized so the intrinsic aspect ratio is never distorted. */}
          <img
            className="ignition__planet"
            src={ASSETS.ignition.planet}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
          />
          <img
            className="ignition__astronaut"
            src={ASSETS.ignition.astronaut}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
          />

          {/* Crimson commit veil, then the particle bloom on top of it. */}
          <div className="ignition__veil" aria-hidden="true" />
          <div className="ignition__bloom" aria-hidden="true" />
          <div className="ignition__sparks ignition__sparks--many" aria-hidden="true">
            {PARTICLES.map(([x, y, size, duration, delay], index) => (
              <span
                className="ignition__particle"
                key={`bright-${index}`}
                style={
                  {
                    "--particle-x": `${x}vw`,
                    "--particle-y": `${y}vh`,
                    "--particle-size": `${size}px`,
                    "--particle-duration": `${duration}s`,
                    "--particle-delay": `${delay}s`,
                  } as CSSProperties
                }
              />
            ))}
          </div>
          <div className="ignition__circles" aria-hidden="true">
            {RED_CIRCLES.map(([x, y, size, duration, delay], index) => (
              <span
                className="ignition__circle"
                key={`circle-${index}`}
                style={
                  {
                    "--circle-x": `${x}vw`,
                    "--circle-y": `${y}vh`,
                    "--circle-size": `${size}rem`,
                    "--circle-duration": `${duration}s`,
                    "--circle-delay": `${delay}s`,
                  } as CSSProperties
                }
              />
            ))}
          </div>

          {/* HUD marker: the only "content", and it is atmosphere. */}
          <p className="eyebrow ignition__marker">
            <span className="eyebrow__index">02</span>
            <span className="eyebrow__sep" aria-hidden="true">
              /
            </span>
            <span className="eyebrow__label">{EVENT.ignition.marker}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
