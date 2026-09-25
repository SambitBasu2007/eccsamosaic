import BackgroundLayer from "./BackgroundLayer/BackgroundLayer";
import FloatingDebris from "./FloatingDebris/FloatingDebris";
import HeroRegister from "./HeroRegister/HeroRegister";
import HeroTitle from "./HeroTitle/HeroTitle";
import LogoMark from "./LogoMark/LogoMark";
import ScrollCue from "./ScrollCue/ScrollCue";

import "./Hero.css";

/**
 * Hero section.
 *
 * Composes five independent systems, each in its own module with its own
 * stylesheet:
 *
 *   1. Preloader film      — components/Preloader (app-level overlay, not here)
 *   2. Background image    — BackgroundLayer
 *   3. Title               — HeroTitle
 *   4. Logo mark           — LogoMark
 *   5. Floating debris     — FloatingDebris
 *   6. Register control    — HeroRegister (top-right, anchor to #register)
 *   7. Scroll cue          — ScrollCue (bottom-centre, anchor to #about)
 *
 * `data-debris-bounds` marks this element as the playfield: the debris engine
 * finds it from the DOM and bounces the rocks off its four edges and off every
 * `data-debris-obstacle` inside it (title, logo, register control).
 */
export default function Hero() {
  return (
    <section className="hero" id="top" data-debris-bounds aria-labelledby="hero-title">
      <BackgroundLayer />
      <FloatingDebris />
      <div className="hero__content">
        <HeroTitle />
        <LogoMark />
      </div>
      <HeroRegister />
      <ScrollCue />
    </section>
  );
}
