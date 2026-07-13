/**
 * InteractiveVideoCard
 *
 * A drop-in replacement for the static image inside each service card.
 * Wraps the existing <Card> shell untouched — only the media slot changes.
 *
 * Behaviour:
 *  - Default:    poster image visible, video loaded but invisible and paused.
 *  - Hover/Focus: video.currentTime = 0 → play(); crossfade poster→video (280ms ease-out)
 *  - Leave/Blur:  video.pause(), video.currentTime = 0; crossfade video→poster
 *  - prefers-reduced-motion: hover elevation kept, playback disabled.
 *
 * Performance:
 *  - Zero React state — all transitions driven by refs + CSS.
 *  - GPU-accelerated opacity transition (compositor-only, no repaints).
 *  - video element sits permanently in the DOM with preload="metadata" so
 *    the first frame is ready before the user hovers.
 *  - will-change applied only during hover, removed on leave.
 */

import { useRef, useCallback } from 'react';
import { Card } from '../ui';

/* ─── Props ──────────────────────────────────────────────────────────────── */

export interface InteractiveVideoCardProps {
  /** Poster image — shown by default and on leave */
  poster: string;
  /** Video src — played on hover/focus */
  video: string;
  /** Card title text */
  title: string;
  /** Card body text */
  description: string;
}

/* ─── Shared CSS transition string ──────────────────────────────────────── */
const FADE = 'opacity 280ms ease-out';

/* ─── Component ──────────────────────────────────────────────────────────── */

export function InteractiveVideoCard({
  poster,
  video,
  title,
  description,
}: InteractiveVideoCardProps) {
  const videoRef  = useRef<HTMLVideoElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);
  const active    = useRef(false);

  /* ── helpers ── */

  const showVideo = useCallback(() => {
    const vid = videoRef.current;
    const img = posterRef.current;
    if (!vid || !img) return;

    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (active.current) return;
    active.current = true;

    // Hint the compositor that this element will animate
    vid.style.willChange = 'opacity';
    img.style.willChange = 'opacity';

    // Reset and start playback — video is already beneath the poster
    vid.currentTime = 0;
    vid.play().catch(() => {/* autoplay policy — silently ignore */});

    // Crossfade poster out, video in
    img.style.opacity = '0';
    vid.style.opacity = '1';
  }, []);

  const hideVideo = useCallback(() => {
    const vid = videoRef.current;
    const img = posterRef.current;
    if (!vid || !img) return;
    if (!active.current) return;
    active.current = false;

    // Pause and rewind so the first frame is ready for the next hover
    vid.pause();
    vid.currentTime = 0;

    // Crossfade video out, poster in
    vid.style.opacity = '0';
    img.style.opacity = '1';

    // Remove will-change after transition ends
    const cleanup = () => {
      vid.style.willChange = 'auto';
      img.style.willChange = 'auto';
    };
    vid.addEventListener('transitionend', cleanup, { once: true });
  }, []);

  /* ── render ── */

  return (
    <Card
      interactive
      className="p-0 overflow-hidden flex flex-col group border-none shadow-md"
      onMouseEnter={showVideo}
      onMouseLeave={hideVideo}
      onFocus={showVideo}
      onBlur={hideVideo}
    >
      {/* ── Media slot — identical dimensions to the original img wrapper ── */}
      <div className="aspect-[4/3] overflow-hidden relative">

        {/* Poster — sits on top by default (z-10), fades out on hover */}
        <img
          ref={posterRef}
          src={poster}
          alt={title}
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{
            opacity: 1,
            transition: `${FADE}, transform 700ms ease`,
            zIndex: 2,
          }}
        />

        {/* Video — hidden beneath the poster, plays on hover */}
        <video
          ref={videoRef}
          src={video}
          preload="metadata"
          playsInline
          muted
          loop
          disablePictureInPicture
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{
            opacity: 0,
            transition: `${FADE}, transform 700ms ease`,
            zIndex: 1,
          }}
        />
      </div>

      {/* ── Text content — completely unchanged ── */}
      <div className="p-6 flex-1 flex flex-col">
        <Card.Title className="text-2xl mb-3">{title}</Card.Title>
        <Card.Description>{description}</Card.Description>
      </div>
    </Card>
  );
}
