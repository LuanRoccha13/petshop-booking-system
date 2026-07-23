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
 *    so touch/mobile devices receive a separate drift animation instead.
 *
 * Visual enhancements (v2):
 *  – Organic mask edges via CSS filter: url(#organic-reveal) on the illustration.
 *  – Auto-discovery sweep on first site visit (localStorage key).
 *  – Contextual cursor element updated inside the same tick() loop.
 *  – Mobile drift: slow Lissajous orbit instead of simply disabling.
 */

import { useEffect, useRef, RefObject } from 'react';

const DISCOVERY_KEY = 'petshop-discovery-v1';

interface UseRevealMaskOptions {
  /** Full radius of the reveal circle when fully open (px). Default 130 */
  outerRadius?: number;
  /** Fraction of outerRadius that stays fully opaque (0–1). Default 0.45 */
  innerRatio?: number;
  /** Lerp factor for cursor position (0–1). Default 0.12 */
  cursorAlpha?: number;
  /** Lerp factor for radius expand/collapse (0–1). Default 0.14 */
  radiusAlpha?: number;
  /**
   * Optional ref to a cursor element that will be positioned
   * at the same coordinates as the reveal mask.
   */
  cursorEl?: RefObject<HTMLElement | null>;
  /**
   * Whether to run the auto-discovery sweep on first site visit.
   * Default: true
   */
  autoHint?: boolean;
}

export function useRevealMask(
  illustrationRef: RefObject<HTMLImageElement | null>,
  sectionRef: RefObject<HTMLElement | null>,
  {
    outerRadius = 130,
    innerRatio  = 0.45,
    cursorAlpha = 0.12,
    radiusAlpha = 0.14,
    cursorEl,
    autoHint = true,
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
    const section = sectionRef.current;
    const img     = illustrationRef.current;
    if (!section || !img) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasPointer    = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    const ca = reducedMotion ? 1 : cursorAlpha;
    const ra = reducedMotion ? 1 : radiusAlpha;

    /* ── will-change hint ────────────────────────────────────────────────── */
    img.style.willChange = 'mask-image, -webkit-mask-image, opacity';

    /* ── Write the mask to the DOM ───────────────────────────────────────── */
    function applyMask() {
      if (!img) return;
      const r = smoothR.current;

      if (r < 0.5) {
        img.style.opacity        = '0';
        img.style.maskImage      = 'none';
        (img.style as any).webkitMaskImage = 'none';
        if (cursorEl?.current) {
          cursorEl.current.classList.remove('is-active');
        }
        return;
      }

      const { x, y } = smoothPos.current;
      const pct  = (innerRatio * 100).toFixed(1);
      const mask = `radial-gradient(circle ${r.toFixed(2)}px at ${x.toFixed(2)}px ${y.toFixed(2)}px, black 0%, black ${pct}%, transparent 100%)`;

      img.style.opacity        = '1';
      img.style.maskImage      = mask;
      (img.style as any).webkitMaskImage = mask;

      // Cursor contextual — atualizado no mesmo tick, zero overhead
      if (cursorEl?.current && section) {
        cursorEl.current.classList.add('is-active');
        // Converter coordenadas da imagem para coordenadas da section
        const imgRect     = img.getBoundingClientRect();
        const sectionRect = section.getBoundingClientRect();
        const sx = (imgRect.left - sectionRect.left) + x;
        const sy = (imgRect.top  - sectionRect.top)  + y;
        cursorEl.current.style.left = `${sx}px`;
        cursorEl.current.style.top  = `${sy}px`;
      }
    }

    /* ── rAF tick (desktop) ──────────────────────────────────────────────── */
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

    /* ── Auto-discovery sweep (localStorage, uma vez na vida) ───────────── */
    function runDiscoverySweep() {
      if (!img) return;
      const rect   = img.getBoundingClientRect();
      const cx     = rect.width  * 0.60;
      const cy     = rect.height * 0.38;

      let elapsed  = 0;
      const OPEN   = 600;   // ms para abrir
      const HOLD   = 200;   // ms parado
      const CLOSE  = 500;   // ms para fechar
      const TOTAL  = OPEN + HOLD + CLOSE;
      let lastTs   = 0;

      function sweepTick(ts: number) {
        if (!lastTs) lastTs = ts;
        elapsed += ts - lastTs;
        lastTs = ts;

        if (elapsed < OPEN) {
          const p = elapsed / OPEN;
          smoothR.current  = outerRadius * p * (reducedMotion ? 1 : 0.85);
          targetR.current  = smoothR.current;
          smoothPos.current = { x: cx, y: cy };
          targetPos.current = { x: cx, y: cy };
        } else if (elapsed < OPEN + HOLD) {
          // hold
        } else if (elapsed < TOTAL) {
          const p = (elapsed - OPEN - HOLD) / CLOSE;
          smoothR.current = outerRadius * 0.85 * (1 - p);
          targetR.current = smoothR.current;
        } else {
          smoothR.current  = 0;
          targetR.current  = 0;
          applyMask();
          return;
        }

        applyMask();
        raf.current = requestAnimationFrame(sweepTick);
      }

      raf.current = requestAnimationFrame(sweepTick);
    }

    /* ── IntersectionObserver para discovery ────────────────────────────── */
    let discoveryDone = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !discoveryDone) {
          discoveryDone = true;
          observer.disconnect();
          if (autoHint && !localStorage.getItem(DISCOVERY_KEY)) {
            localStorage.setItem(DISCOVERY_KEY, '1');
            // Pequeno delay para a seção estar totalmente visível
            setTimeout(runDiscoverySweep, 600);
          }
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(section);

    /* ── MOBILE: drift em órbita Lissajous ──────────────────────────────── */
    if (!hasPointer) {
      if (reducedMotion) return () => observer.disconnect();

      let t = 0;
      function mobileTick() {
        const rect      = img!.getBoundingClientRect();
        const cx        = rect.width  * 0.60;
        const cy        = rect.height * 0.38;
        const amplitude = outerRadius * 0.28;

        t += 0.007; // ~0.44 ciclo por segundo — respiração lenta
        targetPos.current.x = cx + Math.cos(t)        * amplitude;
        targetPos.current.y = cy + Math.sin(t * 0.65) * amplitude * 0.55;
        targetR.current     = outerRadius * 0.55;

        smoothPos.current.x += ca * (targetPos.current.x - smoothPos.current.x);
        smoothPos.current.y += ca * (targetPos.current.y - smoothPos.current.y);
        smoothR.current     += ra * (targetR.current - smoothR.current);

        applyMask();
        raf.current = requestAnimationFrame(mobileTick);
      }

      // Seed inicial para evitar jump do canto 0,0
      const initRect     = img.getBoundingClientRect();
      smoothPos.current  = { x: initRect.width * 0.60, y: initRect.height * 0.38 };
      targetPos.current  = { ...smoothPos.current };
      raf.current        = requestAnimationFrame(mobileTick);

      return () => {
        observer.disconnect();
        cancelAnimationFrame(raf.current);
      };
    }

    /* ── DESKTOP: mouse handlers ─────────────────────────────────────────── */
    function handleMove(e: MouseEvent) {
      if (!img) return;
      const rect = img.getBoundingClientRect();
      targetPos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }

    function handleEnter(e: MouseEvent) {
      inside.current = true;

      // Seed position on first enter to avoid jump from 0,0
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
      if (cursorEl?.current) cursorEl.current.classList.remove('is-active');
      startLoop();
    }

    section.addEventListener('mousemove',  handleMove,  { passive: true });
    section.addEventListener('mouseenter', handleEnter);
    section.addEventListener('mouseleave', handleLeave);

    return () => {
      observer.disconnect();
      section.removeEventListener('mousemove',  handleMove);
      section.removeEventListener('mouseenter', handleEnter);
      section.removeEventListener('mouseleave', handleLeave);
      cancelAnimationFrame(raf.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outerRadius, innerRatio, cursorAlpha, radiusAlpha, autoHint]);
}
