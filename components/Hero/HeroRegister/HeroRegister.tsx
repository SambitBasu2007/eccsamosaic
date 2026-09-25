import { EVENT } from "@/lib/event";

import "./HeroRegister.css";

/**
 * Hero register control.
 *
 * A bracketed HUD-style affordance rather than a marketing button, anchored at
 * the top-right of the hero on desktop and pinned as a fixed, touch-sized pill
 * on small screens so the action is always reachable.
 *
 * `data-debris-obstacle` marks it as solid for the floating debris.
 */
export default function HeroRegister() {
  return (
    <a className="hero-register hud-control" href="#register" data-debris-obstacle>
      <span className="hero-register__bracket" aria-hidden="true">
        [
      </span>
      <span>{EVENT.register.ctaLabel}</span>
      <span className="hero-register__bracket" aria-hidden="true">
        ]
      </span>
    </a>
  );
}
