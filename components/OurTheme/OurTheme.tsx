import SectionBackdrop from "@/components/SectionBackdrop/SectionBackdrop";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import { ASSETS } from "@/lib/assets";
import { EVENT } from "@/lib/event";

import "./OurTheme.css";

/**
 * Our Theme — the lore beat.
 *
 * Post-crisis palette and the gas giant itself, framed as a recovered mission
 * log. Deliberately flavour text only: the real logistics live in the dossier
 * below, so the fiction never turns into a form.
 */
export default function OurTheme() {
  return (
    <section className="section section--crisis our-theme" id="theme" aria-labelledby="theme-title">
      <SectionBackdrop src={ASSETS.scenery.giant} focal="50% 38%" />
      <div className="section__inner our-theme__inner">
        <div className="reveal">
          <SectionHeading
            id="theme-title"
            index="03"
            eyebrow="Transmission"
            title="Our Theme"
            lead={EVENT.theme.lead}
          />
        </div>

        <ol className="our-theme__log reveal">
          {EVENT.theme.log.map((entry) => (
            <li className="our-theme__entry" key={entry.stamp}>
              <span className="label our-theme__stamp">{entry.stamp}</span>
              <p className="our-theme__line">{entry.line}</p>
            </li>
          ))}
        </ol>

        <div className="our-theme__outro reveal">
          <p className="lead our-theme__closing">{EVENT.theme.closing}</p>
          <p className="our-theme__handoff">{EVENT.theme.handoff}</p>
        </div>
      </div>
    </section>
  );
}
