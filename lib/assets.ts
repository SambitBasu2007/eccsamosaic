/**
 * Single manifest for every binary asset the site references.
 *
 * Nothing is inlined or imported through the bundler: each entry is a public URL
 * under `public/assets/`, so swapping artwork means replacing the file (or
 * repointing the path here) and nothing else.
 */
export const ASSETS = {
  hero: {
    /** Deep-space planet image behind the whole hero. */
    background: "/assets/herobackground.jpeg",
  },
  /**
   * The Ignition Sequence scroll scene (section 02): the planet drifts down
   * from above while the astronaut rises from below. Both are transparent PNGs
   * rendered at their intrinsic aspect ratio — never stretched.
   */
  ignition: {
    /** Adrian planet disc — near-full-width arc, transparent background. */
    planet: "/assets/planetadrian.png",
    /** Lone astronaut silhouette converging with the planet. */
    astronaut: "/assets/astronaut.png",
  },
  /**
   * Scenic backgrounds for the sections below the hero.
   *
  * Each section has its own scenic source so the narrative beats stay visually
  * distinct while sharing the same backdrop treatment.
   */
  scenery: {
    /** Green Adrian landscape for the calm About Mosaic section. */
    planet: "/assets/greenadrian.webp",
    /** Red Adrian landscape for the Our Theme crisis section. */
    giant: "/assets/redadrian.webp",
    /** Hero image reused for the Mission Dossier section. */
    dossier: "/assets/herobackground.jpeg",
  },
  logos: {
    /** The single event mark shown under the title. */
    event: "/assets/logos/mosaic-logo.png",
  },
  debris: {
    /** Rocky asteroid PNG (transparent background). */
    rock: "/assets/rocky.png",
  },
  video: {
    /** Full-screen intro film shown on each page load, before the hero is revealed. */
    preloader: "/assets/video/preloader.webm",
  },
} as const;

/**
 * Fonts also live in the shared assets folder so they can be dropped in place.
 *
 * `cindieMono` is the licensed event face and is not committed; until it is
 * dropped in, the self-hosted `spaceMono` stand-in is used. See styles/fonts.css.
 */
export const FONT_ASSETS = {
  cindieMonoWoff2: "/assets/fonts/CindieMono.woff2",
  cindieMonoWoff: "/assets/fonts/CindieMono.woff",
  spaceMonoRegular: "/assets/fonts/SpaceMono-Regular.woff2",
  spaceMonoBold: "/assets/fonts/SpaceMono-Bold.woff2",
  spaceGroteskRegular: "/assets/fonts/SpaceGrotesk-Regular.woff",
  spaceGroteskMedium: "/assets/fonts/SpaceGrotesk-Medium.woff",
} as const;
