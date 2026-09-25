import SectionBackdrop from "@/components/SectionBackdrop/SectionBackdrop";
import SocialIcon from "@/components/Footer/SocialIcons";
import { ASSETS } from "@/lib/assets";
import { EVENT } from "@/lib/event";

import "./Footer.css";

/**
 * Footer — contact, credits, socials, and the closing line.
 *
 * The footer line is "SURVIVE THE UNKNOWN." because it sends the visitor off
 * with a challenge rather than a status report; the other two candidates live
 * in lib/event.ts if it needs swapping.
 */
export default function Footer() {
  const { contact } = EVENT;

  return (
    <footer className="section section--crisis site-footer" id="contact">
      <SectionBackdrop src={ASSETS.scenery.planet} focal="50% 30%" />
      <div className="section__inner site-footer__inner">
        <p className="display-title site-footer__line reveal">{EVENT.footerLine}</p>

        <div className="site-footer__grid">
          <div className="site-footer__col">
            <p className="label">Contact</p>
            <p className="site-footer__value">
              <span>{contact.name}</span>
              <span className="site-footer__sep" aria-hidden="true">
                ·
              </span>
              <a href={`${contact.phoneHref}${contact.phone}`}>{contact.phone}</a>
            </p>
            <p className="site-footer__value">
              <a href={`${contact.emailHref}${contact.email}`}>{contact.email}</a>
            </p>
          </div>

          <div className="site-footer__col">
            <p className="label">Organized by</p>
            <p className="site-footer__value">{EVENT.about.organizedBy}</p>
          </div>

          <div className="site-footer__col">
            <p className="label">Follow</p>
            <ul className="site-footer__socials">
              {EVENT.socials.map((social) => (
                <li key={social.label}>
                  <a className="site-footer__social" href={social.href} aria-label={social.label}>
                    <SocialIcon name={social.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="site-footer__base">
          <p className="label">{EVENT.edition} · ECSSA</p>
          <a className="label site-footer__top" href="#top">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
