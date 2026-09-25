import SectionBackdrop from "@/components/SectionBackdrop/SectionBackdrop";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import { ASSETS } from "@/lib/assets";
import { EVENT } from "@/lib/event";

import "./About.css";

/**
 * About Mosaic — the calm exposition beat.
 *
 * Pre-crisis palette: pale signal-blue accent, white hairlines, the cooler of
 * the two scenic images. Informational rather than spectacle.
 */
export default function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <SectionBackdrop src={ASSETS.scenery.planet} focal="50% 45%" />
      <div className="section__inner about__inner">
        <div className="reveal">
          <SectionHeading id="about-title" index="01" eyebrow="Briefing" title="About Mosaic" />
        </div>

        <div className="about__copy reveal">
          <p className="lead">{EVENT.about.lead}</p>
          {EVENT.about.body.map((paragraph) => (
            <p className="body-text" key={paragraph.slice(0, 28)}>
              {paragraph}
            </p>
          ))}
        </div>

        <dl className="about__credits reveal">
          <div className="stat about__credit">
            <dt className="label">Presented by</dt>
            <dd className="stat__value">{EVENT.about.presentedBy}</dd>
          </div>
          <div className="stat about__credit">
            <dt className="label">Organized by</dt>
            <dd className="stat__value">{EVENT.about.organizedBy}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
