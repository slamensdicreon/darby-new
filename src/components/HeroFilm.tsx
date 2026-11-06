"use client";

import { useEffect, useRef } from "react";

/**
 * Hero background film (build spec 3.1). Decorative, muted, looping and inline.
 * The source is chosen by script so nothing downloads until we know the screen size,
 * and nothing downloads at all under reduced motion, Save-Data or without H.264.
 */
export function HeroFilm({ poster }: { poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return; // poster stays
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return;
    if (!v.canPlayType('video/mp4; codecs="avc1.640028"')) return; // no H.264: poster stays
    const size = window.innerWidth <= 900 ? "960" : "1600"; // lighter file on phones
    // React does not reflect `muted` as an attribute; browsers only autoplay muted video.
    v.muted = true;
    v.defaultMuted = true;
    v.loop = true;
    v.playsInline = true;
    v.src = `/assets/video/darby-hero-${size}.mp4`;
    v.play()?.catch(() => {
      /* Autoplay blocked (e.g. Low Power Mode): the poster remains. */
    });
  }, []);

  return (
    <video
      ref={ref}
      className="hero__media hero-video"
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      disablePictureInPicture
    />
  );
}
