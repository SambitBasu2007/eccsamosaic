import type { SocialIcon } from "@/lib/event";

/**
 * Inline social glyphs.
 *
 * Kept as local SVG rather than an icon dependency: three marks do not justify a
 * package, and these render in a server component with no client bundle cost.
 */

const common = {
  viewBox: "0 0 24 24",
  width: 20,
  height: 20,
  "aria-hidden": true,
  focusable: false,
} as const;

export default function SocialIcon({ name }: { name: SocialIcon }) {
  if (name === "instagram") {
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth={1.6}>
        <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" />
        <circle cx="12" cy="12" r="4.1" />
        <circle cx="17.1" cy="6.9" r="1.15" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (name === "linkedin") {
    return (
      <svg {...common} fill="currentColor">
        <rect x="3" y="8.8" width="3.5" height="12.2" />
        <circle cx="4.75" cy="5.2" r="2.05" />
        <path d="M9.2 8.8h3.35v1.65h.05c.5-.9 1.72-1.7 3.3-1.7 2.95 0 4.3 1.72 4.3 4.85V21h-3.5v-5.9c0-1.5-.5-2.4-1.78-2.4-1.32 0-2.22.9-2.22 2.4V21H9.2V8.8Z" />
      </svg>
    );
  }

  /* WhatsApp — a chat bubble, which reads unambiguously at this size. */
  return (
    <svg {...common} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round">
      <path d="M20.6 11.7c0 4.1-3.85 7.45-8.6 7.45-.95 0-1.87-.14-2.72-.4L4.4 20.6l1.4-3.7a7.13 7.13 0 0 1-1.4-5.2c0-4.11 3.85-7.45 8.6-7.45s7.6 3.34 7.6 7.45Z" />
      <path d="M8.9 11.7h.01M12 11.7h.01M15.1 11.7h.01" strokeLinecap="round" />
    </svg>
  );
}
