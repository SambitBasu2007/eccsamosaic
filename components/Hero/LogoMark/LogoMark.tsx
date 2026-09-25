import { ASSETS } from "@/lib/assets";

import "./LogoMark.css";

type Props = {
  /** Swappable: any image in the shared assets folder. */
  src?: string;
  alt?: string;
};

/**
 * The event's logo mark, sitting under the title.
 *
 * A single PNG referenced by path, so replacing the artwork is a file drop.
 * `data-debris-obstacle` marks it as solid for the floating debris, so the rocks
 * bounce off it instead of drifting through it.
 */
export default function LogoMark({
  src = ASSETS.logos.event,
  alt = "MOSAIC 2026 — technical event",
}: Props) {
  return (
    <div className="hero-logo">
      <img
        className="hero-logo__mark"
        data-debris-obstacle
        src={src}
        alt={alt}
        width={762}
        height={194}
        draggable={false}
      />
    </div>
  );
}
