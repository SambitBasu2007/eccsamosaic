/**
 * Shared intro/preloader constants.
 *
 */

/** Duration of the overlay fade-out. Must match `--intro-fade` in Preloader.css. */
export const INTRO_FADE_MS = 900;

/**
 * Hard ceiling on how long the overlay may stay up. Autoplay can be refused and
 * `ended` may never fire; this guarantees the site is always reachable.
 */
export const INTRO_MAX_HOLD_MS = 15000;
