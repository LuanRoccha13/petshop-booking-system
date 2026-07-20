/**
 * useRevealMask
 *
 * Drives a CSS radial-gradient mask on an illustration layer that "reveals"
 * it around the user's cursor. The photo beneath is always visible.
 *
 * Strategy:
 *  – Mouse events are attached to the `sectionRef` (the full dark section).
 *  – Mask coordinates are translated to the illustration element's local
 *    coordinate space via getBoundingClientRect() on every move.
 *  – A single rAF loop lerps both position and radius independently,
 *    then writes directly to element.style — zero React state mutations.
 *  – `(hover: hover) and (pointer: fine)` media query gates the effect
 *    so touch/mobile devices are completely unaffected.
 */

import { useEffect, useRef, RefObject } from 'react';

interface UseRevealMaskOptions {
  /** Full radius of the reveal circle when fully open (px). Default 130 */
  outerRadius?: number;
  /** Fraction of outerRadius that stays fully opaque (0–1). Default 0.45 */
  innerRatio?: number;
  /** Lerp factor for cursor position (0–1). Default 0.12 */
  cursorAlpha?: number;
  /** Lerp factor for radius expand/collapse (0–1). Default 0.14 */
  radiusAlpha?: number;
}

export function useRevealMask(
  illustrationRef: RefObject<HTMLImageElement | null>,
  sectionRef: RefObject<HTMLElement | null>,
  {
    outerRadius = 130,
    innerRatio  = 0.45,
    cursorAlpha = 0.12,
    radiusAlpha = 0.14,
  }: UseRevealMaskOptions = {}
) {
  // All mutable rAF state lives in refs — never triggers re-renders
  const raf         = useRef<number>(0);
  const inside      = useRef(false);
  const targetPos   = useRef({ x: 0, y: 0 });
  const smoothPos   = useRef({ x: 0, y: 0 });
  const targetR     = useRef(0);
  const smoothR     = useRef(0);

  useEffect(() => {
    // ── Guard: only desktop pointer devices ───────────────────────────
    const hasPointer = window.matchMedia(
      '(hover: hover) and (pointer: fine)'
    ).matches;
    if (!hasPointer) return;

    const section = sectionRef.current;
    const img     = illustrationRef.current;
    if (!section || !img) return;

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const ca = reducedMotion ? 1 : cursorAlpha;
    const ra = reducedMotion ? 1 : radiusAlpha;

    /* ── Set the will-change hint once ───────────────────────────────── */
    img.style.willChange = 'mask-image, -webkit-mask-image, opacity';

    /* ── Write the mask to the DOM ───────────────────────────────────── */
    function applyMask() {
      if (!img) return;
      const r = smoothR.current;

      if (r < 0.5) {
        img.style.opacity          = '0';
        img.style.maskImage        = 'none';
        (img.style as CSSStyleDeclaration & { webkitMaskImage: string }).webkitMaskImage = 'none';
        return;
      }

      const { x, y } = smoothPos.current;
      const pct  = (innerRatio * 100).toFixed(1);
      const mask = `radial-gradient(circle ${r.toFixed(2)}px at ${x.toFixed(2)}px ${y.toFixed(2)}px, black 0%, black ${pct}%, transparent 100%)`;

      img.style.opacity          = '1';
      img.style.maskImage        = mask;
      (img.style as CSSStyleDeclaration & { webkitMaskImage: string }).webkitMaskImage = mask;
    }

    /* ── rAF tick ────────────────────────────────────────────────────── */
    function tick() {
      const { x: tx, y: ty } = targetPos.current;
      const { x: sx, y: sy } = smoothPos.current;

      smoothPos.current.x = sx + ca * (tx - sx);
      smoothPos.current.y = sy + ca * (ty - sy);
      smoothR.current     = smoothR.current + ra * (targetR.current - smoothR.current);

      applyMask();

      const posSettled =
        Math.abs(smoothPos.current.x - tx) < 0.4 &&
        Math.abs(smoothPos.current.y - ty) < 0.4;
      const radSettled = Math.abs(smoothR.current - targetR.current) < 0.25;

      if (!posSettled || !radSettled || inside.current) {
        raf.current = requestAnimationFrame(tick);
      }
    }

    function startLoop() {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(tick);
    }

    /* ── Mouse handlers ──────────────────────────────────────────────── */
    function handleMove(e: MouseEvent) {
      if (!img) return;
      const rect = img.getBoundingClientRect(); // image local space
      targetPos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }

    function handleEnter(e: MouseEvent) {
      inside.current = true;

      // Seed smooth position on first enter so it doesn't jump from 0,0
      if (img && smoothR.current < 1) {
        const rect = img.getBoundingClientRect();
        const sx = e.clientX - rect.left;
        const sy = e.clientY - rect.top;
        smoothPos.current = { x: sx, y: sy };
        targetPos.current = { x: sx, y: sy };
      }

      targetR.current = outerRadius;
      if (reducedMotion) smoothR.current = outerRadius;
      startLoop();
    }

    function handleLeave() {
      inside.current  = false;
      targetR.current = 0;
      startLoop(); // keep animating until radius collapses to 0
    }

    section.addEventListener('mousemove',  handleMove,  { passive: true });
    section.addEventListener('mouseenter', handleEnter);
    section.addEventListener('mouseleave', handleLeave);

    return () => {
      section.removeEventListener('mousemove',  handleMove);
      section.removeEventListener('mouseenter', handleEnter);
      section.removeEventListener('mouseleave', handleLeave);
      cancelAnimationFrame(raf.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outerRadius, innerRatio, cursorAlpha, radiusAlpha]);
}
