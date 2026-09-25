"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import useReducedMotion from "@/hooks/useReducedMotion";
import useSiteReady from "@/hooks/useSiteReady";
import { ASSETS } from "@/lib/assets";
import { INTRO_FADE_MS, INTRO_MAX_HOLD_MS } from "@/lib/intro";

import "./Preloader.css";

/** Hides the overlay when scripting is unavailable, so nobody is stuck on black. */
const NOSCRIPT_CSS = ".preloader{display:none !important}";

type FinishOptions = {
  /** Skip the fade (used when there is nothing on screen to fade). */
  immediate?: boolean;
};

/**
 * Full-screen intro film.
 *
 * The overlay is server-rendered so it covers the hero from the first paint,
 * while the hero itself loads normally underneath — the video is a cover, never
 * a blocker. It fades out once the film has finished *and* the hero is ready to
 * be revealed; if the hero is slower, the video simply holds on its last frame.
 */
export default function Preloader() {
  const reducedMotion = useReducedMotion();
  const siteReady = useSiteReady();

  const [mounted, setMounted] = useState(true);
  const [playVideo, setPlayVideo] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [filmEnded, setFilmEnded] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const finishedRef = useRef(false);
  const holdTimerRef = useRef<number | null>(null);
  const fadeTimerRef = useRef<number | null>(null);

  const clearTimers = useCallback(() => {
    if (holdTimerRef.current !== null) window.clearTimeout(holdTimerRef.current);
    if (fadeTimerRef.current !== null) window.clearTimeout(fadeTimerRef.current);
    holdTimerRef.current = null;
    fadeTimerRef.current = null;
  }, []);

  const finish = useCallback(
    ({ immediate = false }: FinishOptions = {}) => {
      if (finishedRef.current) return;
      finishedRef.current = true;

      clearTimers();
      document.documentElement.setAttribute("data-preloader", "done");

      if (immediate) {
        setMounted(false);
        return;
      }

      setLeaving(true);
      fadeTimerRef.current = window.setTimeout(() => setMounted(false), INTRO_FADE_MS);
    },
    [clearTimers],
  );

  /* Decide whether this visitor sees the intro at all. */
  useEffect(() => {
    if (reducedMotion) {
      finish({ immediate: true });
      return;
    }

    setPlayVideo(true);
    document.documentElement.setAttribute("data-preloader", "playing");
    holdTimerRef.current = window.setTimeout(
      () => finish({ immediate: true }),
      INTRO_MAX_HOLD_MS,
    );

    return () => {
      clearTimers();
      document.documentElement.setAttribute("data-preloader", "done");
    };
  }, [reducedMotion, finish, clearTimers]);

  /* Nudge playback along; if the browser refuses autoplay, get out of the way. */
  useEffect(() => {
    if (!playVideo) return;
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => finish({ immediate: true }));
  }, [playVideo, finish]);

  /* Reveal the hero once the film has ended AND the hero underneath is ready. */
  useEffect(() => {
    if (!mounted || finishedRef.current) return;
    if (filmEnded && siteReady) finish();
  }, [mounted, filmEnded, siteReady, finish]);

  /* Escape always dismisses. */
  useEffect(() => {
    if (!mounted) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mounted, finish]);

  if (!mounted) return null;

  return (
    <div
      className={`preloader${leaving ? " preloader--leaving" : ""}`}
      role="presentation"
      onPointerDown={() => finish()}
    >
      <noscript>
        <style dangerouslySetInnerHTML={{ __html: NOSCRIPT_CSS }} />
      </noscript>

      {playVideo && (
        <video
          ref={videoRef}
          className="preloader__video"
          src={ASSETS.video.preloader}
          muted
          playsInline
          autoPlay
          preload="auto"
          disablePictureInPicture
          tabIndex={-1}
          aria-hidden="true"
          onEnded={() => setFilmEnded(true)}
          onError={() => finish({ immediate: true })}
        />
      )}

      <button type="button" className="preloader__skip" onClick={() => finish()}>
        Skip intro
        <span className="preloader__skip-hint" aria-hidden="true">
          esc
        </span>
      </button>
    </div>
  );
}
