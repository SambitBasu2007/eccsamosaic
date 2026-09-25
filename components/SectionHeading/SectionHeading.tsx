import "./SectionHeading.css";

type Props = {
  /** id for the section's heading; sections point `aria-labelledby` at this. */
  id: string;
  /** Section number, e.g. "01". */
  index: string;
  /** Short mono kicker, e.g. "Briefing". */
  eyebrow: string;
  /** Heading text, set in the display face. */
  title: string;
  /** Optional intro line under the heading. */
  lead?: string;
};

/**
 * Heading block shared by every section: numbered kicker, display-face title,
 * optional lead paragraph. Colours follow the section's phase through
 * `--accent` and `--hairline`.
 */
export default function SectionHeading({ id, index, eyebrow, title, lead }: Props) {
  return (
    <header className="section-heading">
      <p className="eyebrow">
        <span className="eyebrow__index">{index}</span>
        <span className="eyebrow__sep" aria-hidden="true">
          /
        </span>
        <span className="eyebrow__label">{eyebrow}</span>
      </p>
      <h2 className="display-title section-heading__title" id={id}>
        {title}
      </h2>
      {lead ? <p className="lead section-heading__lead">{lead}</p> : null}
    </header>
  );
}
