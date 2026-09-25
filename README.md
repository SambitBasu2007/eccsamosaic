# Petrova Crisis — MOSAIC 2026

Single-page event site. Next.js (App Router) + TypeScript, **no Tailwind** — every
section owns a hand-written CSS file next to its component.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
npm run typecheck  # tsc --noEmit
```

> If you preview this inside an embedded/webview panel and the page never
> hydrates, or scrolling and screenshots appear frozen, that panel is blocking
> the dev server's HMR WebSocket and stalling the frame pipeline. Production
> (`npm run build && npm start`) hydrates correctly there, and `npm run dev` works
> normally in a regular browser.

## Structure

```
app/
  layout.tsx                    app shell: fonts, tokens, intro gate + overlay
  page.tsx                      stacks the sections
  globals.css                   tokens + reset (shared, not a utility library)
styles/
  fonts.css                     @font-face declarations
  sections.css                  shared section/UI primitives (.section, .eyebrow,
                                .label, .stat, .btn, .hud-control, .reveal)
components/
  Preloader/
    Preloader.tsx / .css        intro film overlay
    PreloaderGate.tsx           pre-paint script that skips the intro for
                  reduced-motion visitors
  SectionBackdrop/              shared scenic background + overlay
  SectionHeading/               shared numbered heading block
  Hero/
    Hero.tsx / .css             section shell + the debris playfield
    BackgroundLayer/            hero background image
    HeroTitle/                  "PETROVA CRISIS"
    LogoMark/                   single event logo mark
    FloatingDebris/             drifting asteroid PNGs
      debris.config.ts          rock list: size, start, direction, speed, spin
      useDebrisPhysics.ts       the bounce engine
    HeroRegister/               [ REGISTER ] HUD control → #register
    ScrollCue/                  bottom-centre pulse → #about
  About/                        About Mosaic          (#about)
  Ignition/                     Ignition Sequence     (#ignition) pinned scroll scene
  OurTheme/                     Our Theme             (#theme)
  EventDetails/                 Mission Dossier       (#details)
  Register/                     Register              (#register)
  Footer/                       contact + socials     (#contact)
hooks/
  useReducedMotion.ts
  useSiteReady.ts               fonts + background image + window load
lib/
  assets.ts                     every asset path in one place
  event.ts                      every event fact and every piece of copy
  intro.ts                      intro timing constants
public/assets/                  all binary assets, referenced by path
```

Adding a section = a new folder under `components/` with a `.tsx` and a matching
`.css`, then one line in `app/page.tsx`.

## Design system

Dark mode only. Every section sits on a scenic space photograph with a gradient
overlay between image and text.

| Token | Value | Role |
| --- | --- | --- |
| `--bg` | `#05060a` | page base, letterbox fill, card surfaces |
| `--crimson` | `#c8203c` | post-crisis primary — CTAs, key numbers, active states |
| `--ember` | `#d97b3f` | constant secondary accent |
| `--signal` | `#8fb8d9` | pre-crisis accent (Hero, About Mosaic only) |
| `--text` | `#eee9e2` | headings and body copy |
| `--text-muted` | `#9aa4b2` | meta text, labels, timestamps |
| `--hairline-calm` | `rgba(255,255,255,.08)` | pre-crisis borders |
| `--hairline-crisis` | `rgba(200,32,60,.25)` | post-crisis borders |

### The two-phase palette

The phase is a **section-scoped token override**, not a per-component decision.
`.section--crisis` in `globals.css` re-points `--accent`, `--accent-glow`,
`--accent-tint`, `--hairline` and `--overlay`, and every shared primitive and
section stylesheet reads those variables. So the story beat — calm briefing, then
"the crisis has begun" — is one class on the section:

```
Hero          pre-crisis
About Mosaic  pre-crisis        .section
Ignition      flips to crimson  .section--crisis  (the scroll scene turns it mid-pin)
Our Theme     post-crisis       .section--crisis
Event Details post-crisis       .section--crisis
Register      post-crisis       .section--crisis
Footer        post-crisis       .section--crisis
```

### Typography

- **Headings, labels, HUD chrome, buttons** → `--font-display`: `"Cindie Mono"`,
  then the self-hosted stand-in, then a system monospace stack.
- **Descriptions and body copy** → `--font-body`: Space Grotesk, then a system
  sans stack.

### Section reveals

`.reveal` uses a CSS scroll-driven timeline (`animation-timeline: view()`), guarded
by `@supports` and `prefers-reduced-motion: no-preference`. No JavaScript, and
browsers without support simply render the content — nothing is ever hidden by
script that failed to load.

## Swapping assets

Everything is referenced by path from `lib/assets.ts`, so replacing artwork means
overwriting the file in `public/assets/`. Nothing is inlined or bundled.

| File | Used for | Notes |
| --- | --- | --- |
| `public/assets/herobackground.jpeg` | hero + crisis-section scenery | `object-fit: cover` |
| `public/assets/greenadrian.webp` | calm-section scenery | `object-fit: cover` |
| `public/assets/redadrian.webp` | crisis-section scenery | `object-fit: cover` |
| `public/assets/planetadrian.png` | Ignition planet (transparent PNG) | intrinsic ratio, never stretched |
| `public/assets/astronaut.png` | Ignition astronaut silhouette | transparent PNG |
| `public/assets/rocky.png` | floating debris | see `ROCK_SOURCE_CONTENT` |
| `public/assets/logos/mosaic-logo.png` | the single logo mark | **placeholder** |
| `public/assets/video/preloader.webm` | intro film | **placeholder**, VP9, silent |
| `public/assets/fonts/SpaceMono-*.woff2` | heading stand-in | OFL, self-hosted |
| `public/assets/fonts/SpaceGrotesk-*.woff` | body/description | OFL, self-hosted |
| `public/assets/fonts/CindieMono.woff2` | the event typeface | **not included** |

Only a handful of scenic photographs exist, so the sections alternate them with
different `object-position` values and overlays. Drop more images into
`public/assets/` and point a section at one to break the repetition.

### Still to drop in

1. **Cindie Mono by Lewis McGuffie** — the typeface this design is set in, and a
  *commercial* release (sold via East of Rome / FutureFonts; the designer sends
  trial cuts on request). It is deliberately not vendored here. If it is
  installed on the device, every heading switches over automatically;
  otherwise the bundled Space Mono stand-in is used.
2. **The logo mark** — `public/assets/logos/mosaic-logo.png` currently holds a
   generated placeholder.
3. **The intro film** — `public/assets/video/preloader.webm` is a generated 4.5s
   VP9 placeholder. If the file is missing the preloader steps
   aside rather than trapping anyone.
4. **Real event details** — every bracketed value and all the lore copy lives in
   `lib/event.ts`. The dossier, the register facts, the footer contact block and
   the theme log all read from it, so filling in the real details is one file.

## How the hero behaves

- **Intro film** covers the viewport from the very first paint while the hero
  loads underneath. It fades out once the film has ended *and* the hero is ready;
  if the hero is slower it holds on the last frame. Skippable by click, button or
  `Esc`, played on every page load, skipped entirely for reduced motion, and
  capped at 15s so it can never trap anyone.
- **Film framing** is `object-fit: cover`, so the screen always sits fully inside
  the film. On portrait screens the film is rotated a quarter turn and its box
  takes the swapped viewport dimensions.
- **Background** uses `object-fit: cover`.
- **Debris** drifts slowly and tumbles, turning away from the hero's four walls
  and from every `data-debris-obstacle` inside it — currently the title, the logo
  and the register control. Bounces ease into the new heading instead of snapping.
  Movement is transform-only, the loop pauses when the hero is off-screen, the
  rock count drops to two below 40rem for mobile GPU budget, and reduced motion
  freezes the rocks in place rather than removing them.

## How the Ignition Sequence behaves

- **Pinned scroll scene**, 300vh track with a sticky 100svh stage. A single
  scroll-driven animation (`animation-timeline: view()`, `cover 25% → 75%` — the
  exact pin window) animates registered `--ign-*` custom properties, so one
  scroll-progress value drives every layer and the scene reverses exactly when
  you scroll back up. No JavaScript, no timers, no per-scroll style writes.
- **Four phases by progress**: entrance 0→0.30 (planet descends, astronaut
  rises, planet lags for parallax), hold 0.30→0.60 (rotation, bob, red glow
  ramps in), ignition 0.60→0.85 (particle bloom + crimson veil + both PNGs tint
  red together), handoff 0.85→1 (whole composition cross-dissolves out as Our
  Theme fades in beneath).
- **Never stretched**: each image gets exactly one dimension
  (`height: min(...)`), width follows the intrinsic ratio.
- **Fallback**: without `animation-timeline` support, or under
  `prefers-reduced-motion`, the section renders the final composed frame —
  planet + astronaut + light red tint — at auto height, no motion.

## Deliberately not included

- **Lenis / GSAP ScrollTrigger / ogl.** Section reveals and smooth anchor
  scrolling are done in ~20 lines of CSS with no dependencies, and the pinned
  Ignition Sequence turned out to need no scroll engine either — native
  `position: sticky` plus a scroll-driven timeline covers it, so the dependency
  never earned its weight.
- **Phosphor Icons.** The footer needs three marks, so they are inline SVG in
  `components/Footer/SocialIcons.tsx` — no dependency, and they render in a
  server component. Swap in Phosphor when the site needs a wider icon set.
- **`object-fit: contain` on section backgrounds.** The spec for the new sections
  asks for letterboxed `contain`, but the hero was explicitly moved to `cover`;
  the sections follow the hero so the page reads as one continuous space. Each
  backdrop is a single `object-fit` declaration if you want to switch back.
