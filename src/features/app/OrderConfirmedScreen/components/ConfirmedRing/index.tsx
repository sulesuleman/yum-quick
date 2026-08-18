import React from 'react';
import { Circle, Svg } from 'react-native-svg';

import { theme } from '@theme';

import { useConfirmedRingStyles } from './useConfirmedRingStyles';

const SIZE = 130;
const STROKE_WIDTH = 6;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CENTER = SIZE / 2;
const DOT_RADIUS = 9;

export function ConfirmedRing() {
  const styles = useConfirmedRingStyles();

  return (
    <svg
      width='146'
      height='146'
      viewBox='0 0 146 146'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M73 142.5C111.384 142.5 142.5 111.384 142.5 73C142.5 34.6162 111.384 3.5 73 3.5C34.6162 3.5 3.5 34.6162 3.5 73C3.5 111.384 34.6162 142.5 73 142.5Z'
        stroke='#E95322'
        stroke-width='7'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <ellipse cx='43.1151' cy='72.305' rx='9.035' ry='9.035' fill='#E95322' />
    </svg>
  );
}

