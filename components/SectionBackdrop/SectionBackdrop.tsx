import "./SectionBackdrop.css";

type Props = {
  /** Any scenic image in the shared assets folder. */
  src: string;
  /** CSS `object-position`, for nudging the framing per section. */
  focal?: string;
  /** Set on the first section below the fold to skip lazy loading. */
  eager?: boolean;
};

/**
 * Full-bleed scenic background for a section.
 *
 * The image covers the section and a gradient overlay sits between it and the
 * text. The overlay is `var(--overlay)`, which the parent section flips between
 * the neutral and crimson-tinted version through `.section--crisis` — so the
 * before/after palette lives entirely in the tokens file.
 *
 * The image is atmospheric rather than informational, so it is hidden from
 * assistive tech.
 */
export default function SectionBackdrop({ src, focal = "50% 50%", eager = false }: Props) {
  return (
    <div className="backdrop" aria-hidden="true">
      <img
        className="backdrop__image"
        src={src}
        alt=""
        style={{ objectPosition: focal }}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
      />
      <div className="backdrop__overlay" />
    </div>
  );
}
