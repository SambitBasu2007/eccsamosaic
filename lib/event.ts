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
    lead:
      "MOSAIC is the  technical fest of St. Francis Institute of Technology – a gathering of engineers, designers and problem-solvers who would rather build the answer than wait for one.",
    body: [
      "ECSSA is the student technical society behind it: the committee that plans, funds and runs the event end to end, every edition. MOSAIC is where that year of work is put in front of an audience.",
      "Each edition is built around a single theme, and everything — the brief, the stages, the judging — is staged inside it. This year's theme is Petrova Crisis.",
    ],
    presentedBy: "ECSSA",
    organizedBy: "Mosaic 2026 · St. Francis Institute of Technology",
  },

  /* --- Ignition Sequence (section 02) ----------------------------------- */
  ignition: {
    marker: "Ignition",
  },

  /* --- Our Theme -------------------------------------------------------- */
  theme: {
    lead:
      "Recovered from survey platform PETROVA-7 — the last complete log before contact was lost.",
    log: [
      {
        stamp: "T+00:04",
        line: "Orbit nominal. Eleven cycles of clean telemetry. Nothing out here but storm bands and silence.",
      },
      {
        stamp: "T+00:31",
        line: "Platform has decayed 4.2° with no thrust command issued. Nothing on board is doing this. Something is pulling.",
      },
      {
        stamp: "T+01:12",
        line: "The bands are moving against the wind. Ammonia readings are climbing off the instrument ceiling.",
      },
      {
        stamp: "T+02:47",
        line: "It is inside the storm. It is not weather.",
      },
    ],
    closing:
      "Petrova is a crisis now — a planet mid-collapse with everything humanity has left riding on the readouts. Every team that enters the simulation is another attempt at the same answer.",
    handoff: "The crisis has begun.",
  },

  /* --- Mission Dossier -------------------------------------------------- */
  dossier: {
    date: "",
    venue: "St. Francis Institute of Technology, room no. 618",
    location: "St. Francis Institute of Technology, 6th floor, room 618",
    prizePool: "₹idk Cash Prize",
    teamFormat: "teams of 2-4",
    entryFee: "₹70",
  },

  /* --- Register --------------------------------------------------------- */
  register: {
    status: "<- Register here",
    url: "#",
    ctaLabel: "Register now",
  },

  /* --- Footer ----------------------------------------------------------- */
  contact: {
    name: "ECSSA · Electronics and Computer Science Student Association",
    phone: "[Phone no]",
    email: "[Email]",
    emailHref: "mailto:",
    phoneHref: "tel:",
  },
  socials: [
    { icon: "instagram", label: "Instagram", href: "https://www.instagram.com/team_ecssa" },
    { icon: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/ecssa-sfit/posts/" },
    { icon: "whatsapp", label: "WhatsApp", href: "#" },
  ],
  footerLine: "THE SYSTEM IS FAILING.",
} as const;

/** Label/value rows for the dossier grid, in presentation order. */
export const DOSSIER_ROWS: { label: string; value: string }[] = [
  { label: "Event date", value: EVENT.dossier.date },
  { label: "Venue", value: EVENT.dossier.venue },
  { label: "Event location", value: EVENT.dossier.location },
  { label: "Prize pool", value: EVENT.dossier.prizePool },
  { label: "Team format", value: EVENT.dossier.teamFormat },
  { label: "Entry fee", value: EVENT.dossier.entryFee },
];

/** The three facts restated above the register CTA. */
export const REGISTER_FACTS: { label: string; value: string }[] = [
  { label: "Entry fee", value: EVENT.dossier.entryFee },
  { label: "Team format", value: EVENT.dossier.teamFormat },
];

export type SocialIcon = (typeof EVENT.socials)[number]["icon"];
