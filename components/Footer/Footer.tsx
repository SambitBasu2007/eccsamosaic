import SectionBackdrop from "@/components/SectionBackdrop/SectionBackdrop";
import SocialIcon, { ContactIcon } from "@/components/Footer/Icons";
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

  const phoneHref = contact.phoneHref?.startsWith("tel:")
    ? contact.phoneHref
    : `tel:${(contact.phoneHref || contact.phone).replace(/\s+/g, "")}`;

  const emailHref = contact.emailHref?.startsWith("mailto:")
    ? contact.emailHref
    : `mailto:${(contact.emailHref || contact.email).trim()}`;

  return (
    <footer className="section section--crisis site-footer" id="contact">
      <SectionBackdrop src={ASSETS.scenery.planet} focal="50% 30%" />
      <div className="section__inner site-footer__inner">
        <p className="display-title site-footer__line reveal">{EVENT.footerLine}</p>

        <div className="site-footer__grid">
          <div className="site-footer__col">
            <p className="label">Contact</p>
            {/* The association sits on its own line; each way of reaching it
                gets its own line and its own glyph. */}
            <p className="site-footer__value">{contact.name}</p>
            <ul className="site-footer__links">
              <li>
                <a className="site-footer__link" href={phoneHref}>
                  <ContactIcon name="phone" />
                  <span>{contact.phone}</span>
                </a>
              </li>
              <li>
                <a className="site-footer__link" href={emailHref}>
                  <ContactIcon name="mail" />
                  <span>{contact.email}</span>
                </a>
              </li>
            </ul>
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
          <p className="label">{EVENT.edition} · ECSSA · Made by Sambit (ECSSA Tech EXEC)</p>
          <a className="label site-footer__top" href="#top">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
