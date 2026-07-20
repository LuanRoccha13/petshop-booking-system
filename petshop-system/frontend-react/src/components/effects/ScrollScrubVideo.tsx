/**
 * ScrollScrubVideo
 *
 * Drop-in replacement for the hero <img> element.
 * Renders a <video> that is driven entirely by scroll — never plays on its own.
 *
 * Props mirror the original <img> positioning classes so the layout is untouched.
 */

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useScrollVideo } from '../../hooks/useScrollVideo';

interface ScrollScrubVideoProps {
  src: string;
  /** The hero <section> ref — defines the scroll range */
  containerRef: React.RefObject<HTMLElement | null>;
  className?: string;
}

export function ScrollScrubVideo({
  src,
  containerRef,
  className = '',
}: ScrollScrubVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useScrollVideo(videoRef, { containerRef, lerpFactor: 0.075 });

  return (
    <motion.video
      ref={videoRef}
      src={src}
      // ── Playback policy ─────────────────────────────────────────────
      autoPlay={false}
      loop={false}
      muted
      playsInline
      preload="auto"
      // ── Accessibility / UX ──────────────────────────────────────────
      aria-hidden="true"
      disablePictureInPicture
      // ── Entrance animation (same spring as original <img>) ──────────
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      // ── Styling — identical to the original <img> classes ───────────
      className={`absolute bottom-0 right-0 h-[90%] w-auto max-w-none object-contain object-bottom pointer-events-none select-none ${className}`}
      style={{ willChange: 'transform' }}
    />
  );
}
