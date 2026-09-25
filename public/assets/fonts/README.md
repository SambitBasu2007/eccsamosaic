# Fonts

## In use

- `SpaceMono-Regular.woff2`, `SpaceMono-Bold.woff2` — **Space Mono**, self-hosted
  stand-in, SIL Open Font License 1.1 (`SpaceMono-OFL.txt`).

## The event typeface

**Cindie Mono** by Lewis McGuffie is the face this design is set in. It is a
*commercial* release — sold through East of Rome / FutureFonts, with the designer
handing out trial cuts by request — so it is deliberately not committed here.

To activate it, buy or trial it and drop the files in this folder:

- `CindieMono.woff2` (preferred)
- `CindieMono.woff` (optional legacy fallback)

`styles/fonts.css` already declares the `@font-face` for both, and
`app/globals.css` lists `"Cindie Mono"` first in `--font-display`. It therefore
takes over from the stand-in with no code change. Cindie ships in four widths, so
a full licence will likely add faces — copy the `@font-face` block and set
`font-weight` / `font-style` to match.
