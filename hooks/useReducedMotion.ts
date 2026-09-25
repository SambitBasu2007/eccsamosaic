"use client";

import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Tracks the user's reduced-motion preference and keeps up with live changes.
 * Always false during SSR / the first paint so markup stays deterministic.
 */
export default function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(QUERY);
    const sync = () => setReduced(mql.matches);
    sync();
    mql.addEventListener("change", sync);
    return () => mql.removeEventListener("change", sync);
  }, []);

  return reduced;
}
