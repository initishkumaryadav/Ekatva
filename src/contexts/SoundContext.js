import { createContext, useContext, useState, useCallback, useRef } from 'react';

const SoundContext = createContext(null);

// Web Audio API for game-style sounds
function createBeep(ctx, freq, duration, type = 'sine', gain = 0.1) {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  g.gain.setValueAtTime(gain, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.connect(g);
  g.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
}

export function SoundProvider({ children }) {
  const [enabled, setEnabled] = useState(true);
  const ctxRef = useRef(null);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return ctxRef.current;
  }, []);

  const playClick = useCallback(() => {
    if (!enabled) return;
    try {
      const ctx = getCtx();
      createBeep(ctx, 800, 0.08, 'square', 0.05);
    } catch {}
  }, [enabled, getCtx]);

  const playHover = useCallback(() => {
    if (!enabled) return;
    try {
      const ctx = getCtx();
      createBeep(ctx, 1200, 0.04, 'sine', 0.03);
    } catch {}
  }, [enabled, getCtx]);

  const playSuccess = useCallback(() => {
    if (!enabled) return;
    try {
      const ctx = getCtx();
      createBeep(ctx, 523, 0.1, 'sine', 0.08);
      setTimeout(() => createBeep(ctx, 659, 0.1, 'sine', 0.08), 100);
      setTimeout(() => createBeep(ctx, 784, 0.15, 'sine', 0.08), 200);
    } catch {}
  }, [enabled, getCtx]);

  const playLevelUp = useCallback(() => {
    if (!enabled) return;
    try {
      const ctx = getCtx();
      [523, 587, 659, 784, 880].forEach((f, i) => {
        setTimeout(() => createBeep(ctx, f, 0.12, 'square', 0.06), i * 80);
      });
    } catch {}
  }, [enabled, getCtx]);

  const playError = useCallback(() => {
    if (!enabled) return;
    try {
      const ctx = getCtx();
      createBeep(ctx, 200, 0.2, 'sawtooth', 0.06);
    } catch {}
  }, [enabled, getCtx]);

  const screenShake = useCallback(() => {
    document.body.style.transition = 'transform 0.05s';
    document.body.style.transform = 'translateX(3px)';
    setTimeout(() => { document.body.style.transform = 'translateX(-3px)'; }, 50);
    setTimeout(() => { document.body.style.transform = 'translateX(2px)'; }, 100);
    setTimeout(() => { document.body.style.transform = 'translateX(0)'; }, 150);
  }, []);

  return (
    <SoundContext.Provider value={{ enabled, setEnabled, playClick, playHover, playSuccess, playLevelUp, playError, screenShake }}>
      {children}
    </SoundContext.Provider>
  );
}

export const useSound = () => useContext(SoundContext);
