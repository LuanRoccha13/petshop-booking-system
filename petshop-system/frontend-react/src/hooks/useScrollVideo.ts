/**
 * useScrollVideo
 *
 * Maps scroll progress inside a target element to a video's currentTime.
 * Uses requestAnimationFrame + lerp for 60 FPS buttery smoothness (Apple-style scrubbing).
 *
 * Algorithm:
 *  1. useScroll (Framer Motion) gives raw scrollYProgress [0, 1] without rerenders.
 *  2. A rAF loop reads the raw value every frame and lerps a "smooth" accumulator toward it.
 *  3. The lerped value is multiplied by video.duration and written to video.currentTime.
 *
 * No React state is mutated during scroll — zero rerenders after mount.
 * prefers-reduced-motion: lerp factor jumps to 1 (instant, no interpolation).
 */

import { useEffect, useRef, RefObject } from 'react';
import { useScroll } from 'framer-motion';

interface UseScrollVideoOptions {
  /** The section element that defines the scroll range */
  containerRef: RefObject<HTMLElement | null>;
  /**
   * Lerp factor per frame (0 < alpha ≤ 1).
   * Lower = smoother but laggier. Default 0.08 matches Apple's feel.
   * Ignored when prefers-reduced-motion is active (jumps to 1).
   */
  lerpFactor?: number;
}

export function useScrollVideo(
  videoRef: RefObject<HTMLVideoElement | null>,
  { containerRef, lerpFactor = 0.08 }: UseScrollVideoOptions
) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Keep scrollYProgress in a ref so the rAF closure always reads the latest value
  const progressRef = useRef(0);

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      progressRef.current = v;
    });
  }, [scrollYProgress]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const alpha = reducedMotion ? 1 : lerpFactor;

    let rafId: number;
    let isRunning = true;
    let smoothProgress = 0;

    function tick() {
      if (!isRunning) return;

      const target = progressRef.current;
      smoothProgress += alpha * (target - smoothProgress);

      if (video && isFinite(video.duration) && video.duration > 0) {
        const nextTime = smoothProgress * video.duration;
        if (Math.abs(video.currentTime - nextTime) > 0.001) {
          video.currentTime = nextTime;
        }
      }

      rafId = requestAnimationFrame(tick);
    }

    function startLoop() {
      rafId = requestAnimationFrame(tick);
    }

    if (video.readyState >= 1) {
      startLoop();
    } else {
      video.addEventListener('loadedmetadata', startLoop, { once: true });
    }

    return () => {
      isRunning = false;
      cancelAnimationFrame(rafId);
    };
  }, [videoRef, lerpFactor]);
}
