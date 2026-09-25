import "./HeroTitle.css";

/**
 * Event title, set in Cindie Mono (self-hosted, see styles/fonts.css) with a
 * monospace fallback stack so it always renders.
 *
 * `data-debris-obstacle` marks this heading as solid for the floating debris:
 * the rocks bounce off its box instead of passing over or behind the type. The
 * two lines are stacked blocks inside one element, so that box is a single
 * clean rectangle rather than a ragged text run.
 */
export default function HeroTitle() {
  return (
    <div className="hero-title">
      <h1 className="hero-title__text" id="hero-title" data-debris-obstacle>
        <span className="hero-title__word">Petrova</span>
        <span className="hero-title__word">Crisis</span>
      </h1>
    </div>
  );
}
