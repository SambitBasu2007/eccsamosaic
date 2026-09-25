import SectionBackdrop from "@/components/SectionBackdrop/SectionBackdrop";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import { ASSETS } from "@/lib/assets";
import { DOSSIER_ROWS } from "@/lib/event";

import "./EventDetails.css";

/**
 * Event Details, styled as a mission dossier.
 *
 * Label/value pairs in a terminal-readout grid rather than prose: multi-column
 * on desktop, a stacked list of hairline-separated rows on mobile.
 */
export default function EventDetails() {
  return (
    <section className="section section--crisis dossier" id="details" aria-labelledby="details-title">
      <SectionBackdrop src={ASSETS.scenery.dossier} focal="62% 58%" />
      <div className="section__inner">
        <div className="reveal">
          <SectionHeading
            id="details-title"
            index="04"
            eyebrow="Event details"
            title="Mission Dossier"
          />
        </div>

        <dl className="dossier__grid reveal">
          {DOSSIER_ROWS.map((row) => (
            <div className="stat dossier__row" key={row.label}>
              <dt className="label">{row.label}</dt>
              <dd className="stat__value">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
