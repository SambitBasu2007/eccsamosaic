import "./ScrollCue.css";

/**
 * Scroll cue at the bottom of the hero.
 *
 * Doubles as a shortcut to the next section: clicking or tapping it advances the
 * page. The pulse is a slow breath, and it stops entirely under
 * `prefers-reduced-motion`.
 */
export default function ScrollCue() {
  return (
    <a className="scroll-cue" href="#about" aria-label="Scroll to About Mosaic">
      <span className="scroll-cue__label">Scroll</span>
      <span className="scroll-cue__bar" aria-hidden="true">
        <span className="scroll-cue__tracer" />
      </span>
    </a>
  );
}
