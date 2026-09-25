import { ASSETS } from "@/lib/assets";

import "./BackgroundLayer.css";

type Props = {
  /** Swappable: point this at any image in the shared assets folder. */
  src?: string;
};

/**
 * Static space/planet artwork behind every other hero element.
 *
 * Rendered with `object-fit: cover` and centred: the artwork is scaled until the
 * screen fits inside the picture, so the section is filled edge to edge with no
 * letterbox bands. The base dark colour only shows before the image loads, and
 * a vignette keeps the title legible over the brighter regions.
 *
 * The image is decorative, so it is hidden from assistive tech rather than
 * described.
 */
export default function BackgroundLayer({ src = ASSETS.hero.background }: Props) {
  return (
    <div className="hero-bg" aria-hidden="true">
      <img className="hero-bg__image" src={src} alt="" fetchPriority="high" decoding="async" />
      <div className="hero-bg__vignette" />
    </div>
  );
}
