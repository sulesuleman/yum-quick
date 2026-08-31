import { useEffect, useRef, useState } from 'react';

/** Animates a number from 0 up to `target` whenever `target` changes — used to give dashboard
    stats a bit of life instead of just popping in once the data loads. */
export function useCountUp(target: number, durationMs = 700) {
  const [value, setValue] = useState(0);
  const frameRef = useRef<number>();

  useEffect(() => {
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current !== undefined) cancelAnimationFrame(frameRef.current);
    };
  }, [target, durationMs]);

  return value;
}
