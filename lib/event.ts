/**
 * Every fact and piece of copy that changes per event lives here.
 *
 * Values in square brackets are placeholders waiting on real details — they are
 * rendered verbatim on the page so it is obvious what still needs filling in.
 */

export const EVENT = {
  name: "Petrova Crisis",
  edition: "MOSAIC 2026",

  /* --- About Mosaic ----------------------------------------------------- */
  about: {
    lead: "MOSAIC 2026 is where technology meets the unknown.",
    body: [
      "Built by ECSSA, Petrova Crisis is a high-pressure technical experience designed for teams that can think fast, adapt faster, and keep moving when the system starts breaking.",
      "This isn't just another technical event. Something has gone wrong. And your team has been called in.",
    ],
    presentedBy: "ECSSA",
    organizedBy: "Mosaic 2026 · St. Francis Institute of Technology",
  },

  /* --- Ignition Sequence ------------------------------------------------ */
  /* Kept for the (currently unrendered) Ignition component; the section was
     removed from the page, so nothing on the site reads this right now. */
  ignition: {
    marker: "Ignition",
  },

  /* --- Our Theme -------------------------------------------------------- */
  /* The section's single header is `lead` ("RECOVERED TRANSMISSION"); the log
     below it is the payload. */
  theme: {
    lead: "RECOVERED TRANSMISSION",
    source: "PETROVA-7",
    status: "PARTIAL",
    log: [
      {
        stamp: "LOG 01",
        line: "Orbit nominal. Telemetry stable.",
        detail: "The last clean reading arrived before contact was lost.",
      },
      {
        stamp: "LOG 02",
        line: "Uncommanded orbital deviation detected.",
        detail: "The deviation occurred without a corresponding thrust command.",
      },
      {
        stamp: "LOG 03",
        line: "Atmospheric readings exceeding known limits.",
        detail: "The atmosphere is outside every known operating threshold.",
      },
      {
        stamp: "LOG 04",
        line: "Visual confirmation received.",
        detail: "The visual feed confirms an object inside the storm.",
      },
    ],
    closing:
      "This is not a storm. It is not a malfunction. And it is not stopping. The PETROVA-7 transmission ends here. What happened next remains classified.",
    handoff: "The crisis has begun.",
  },

  /* --- Mission Dossier -------------------------------------------------- */
  dossier: {
    date: "16–17 OCTOBER 2026",
    location: "St. Francis Institute of Technology · 6th Floor · Room 618",
    teamSize: "3–4 members",
    entryFeeTeam3: "Team of 3 — ₹150",
    entryFeeTeam4: "Team of 4 — ₹200",
  },

  /* --- Register --------------------------------------------------------- */
  register: {
    status: "MISSION STATUS OPEN FOR REGISTRATION",
    url: "#",
    ctaLabel: "REGISTER NOW",
    closing:
      "The transmission has been recovered. The coordinates are known. The crisis isn't waiting. Gather your team. Enter Petrova.",
  },

  /* --- Footer ----------------------------------------------------------- */
  contact: {
    name: "ECSSA · Electronics and Computer Science Student Association",
    phone: "[Phone no]",
    email: "[Email]",
    emailHref: "ecssa@sfit.ac.in",
    phoneHref: "8850239487",
  },
  socials: [
    { icon: "instagram", label: "Instagram", href: "https://www.instagram.com/team_ecssa" },
    { icon: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/ecssa-sfit/posts/" },
    { icon: "whatsapp", label: "WhatsApp", href: "#" },
  ],
  footerLine: "THE SYSTEM IS FAILING.",
} as const;

/** Label/value rows for the dossier grid, in presentation order. */
export const DOSSIER_ROWS: { id: string; label: string; value: string }[] = [
  { id: "event-date", label: "Event date", value: EVENT.dossier.date },
  { id: "event-location", label: "Event location", value: EVENT.dossier.location },
  { id: "team-size", label: "Team size", value: EVENT.dossier.teamSize },
  { id: "entry-fee-team-of-3", label: "Entry", value: EVENT.dossier.entryFeeTeam3 },
  { id: "entry-fee-team-of-4", label: "Entry", value: EVENT.dossier.entryFeeTeam4 },
];

/** The facts restated above the register CTA. */
export const REGISTER_FACTS: { label: string; value: string }[] = [
  { label: "Team of 3", value: "₹150" },
  { label: "Team of 4", value: "₹200" },
];

export type SocialIcon = (typeof EVENT.socials)[number]["icon"];
