/**
 * motionFrame — RAF compartilhado global
 *
 * Todos os componentes que precisam de animação por frame (RevealMask,
 * cursor highlight, spotlight) se registram aqui ao invés de criar
 * seus próprios requestAnimationFrame.
 *
 * O loop começa quando o primeiro subscriber se registra.
 * O loop para quando o último subscriber cancela.
 * O browser nunca executa mais de 1 rAF por frame, independente
 * de quantos componentes estejam ativos.
 */

import { useEffect } from 'react';

export type FrameCallback = (timestamp: number) => void;

const subscribers = new Set<FrameCallback>();
let rafId = 0;
let isRunning = false;

function tick(timestamp: number) {
  subscribers.forEach(fn => fn(timestamp));
  if (isRunning) {
    rafId = requestAnimationFrame(tick);
  }
}

function start() {
  if (!isRunning) {
    isRunning = true;
    rafId = requestAnimationFrame(tick);
  }
}

function stop() {
  isRunning = false;
  cancelAnimationFrame(rafId);
}

/**
 * Registra um callback no loop RAF global.
 * Retorna uma função de cleanup (cancel).
 */
export function subscribeFrame(fn: FrameCallback): () => void {
  subscribers.add(fn);
  start();
  return () => {
    subscribers.delete(fn);
    if (subscribers.size === 0) stop();
  };
}

/**
 * Hook React que registra um callback no loop RAF global.
 * O callback é automaticamente cancelado no unmount.
 *
 * @param fn    Callback a executar por frame
 * @param active  Se false, o callback não é registrado (útil para guards)
 */
export function useMotionFrame(fn: FrameCallback, active = true) {
  useEffect(() => {
    if (!active) return;
    // Estabiliza a referência para não re-registrar a cada render
    const stable = fn;
    return subscribeFrame(stable);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
}
