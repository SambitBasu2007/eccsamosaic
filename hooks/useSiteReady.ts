"use client";

import { useEffect, useState } from "react";

import { ASSETS } from "@/lib/assets";

/** Resolves when the page has genuinely painted its first hero frame. */
function fontsReady(): Promise<unknown> {
  const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
  return fonts ? fonts.ready : Promise.resolve();
}

/** Resolves once `src` is decoded (or has definitively failed). */
function imageReady(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
    if (img.complete) resolve();
  });
}

function windowLoaded(): Promise<void> {
  if (document.readyState === "complete") return Promise.resolve();
  return new Promise((resolve) => window.addEventListener("load", () => resolve(), { once: true }));
}

/**
 * True once fonts, the hero background image and the window `load` event have
 * all settled. The preloader holds its last frame until then, so the reveal
 * never lands on a half-painted hero.
 */
export default function useSiteReady(): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    Promise.all([fontsReady(), imageReady(ASSETS.hero.background), windowLoaded()]).then(() => {
      if (!cancelled) setReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return ready;
}
