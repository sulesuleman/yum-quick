import { useWindowDimensions } from 'react-native';

const GUIDELINE_BASE_WIDTH = 375;

const MIN_SCALE_FACTOR = 0.85;
const MAX_SCALE_FACTOR = 1.25;
const MODERATION_FACTOR = 0.5;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function getScaleFactor(width: number) {
  const rawFactor = width / GUIDELINE_BASE_WIDTH;
  const moderated = 1 + (rawFactor - 1) * MODERATION_FACTOR;
  return clamp(moderated, MIN_SCALE_FACTOR, MAX_SCALE_FACTOR);
}

export function scale(size: number, width: number) {
  return size * getScaleFactor(width);
}

export function useScale() {
  const { width } = useWindowDimensions();
  const factor = getScaleFactor(width);
  return { factor, scale: (size: number) => size * factor };
}
