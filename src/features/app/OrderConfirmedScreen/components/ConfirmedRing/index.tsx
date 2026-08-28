import React from 'react';
import { Ellipse, Path, Svg } from 'react-native-svg';

export function ConfirmedRing() {
  return (
    <Svg width={146} height={146} viewBox='0 0 146 146' fill='none'>
      <Path
        d='M73 142.5C111.384 142.5 142.5 111.384 142.5 73C142.5 34.6162 111.384 3.5 73 3.5C34.6162 3.5 3.5 34.6162 3.5 73C3.5 111.384 34.6162 142.5 73 142.5Z'
        stroke='#E95322'
        strokeWidth={7}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Ellipse cx={43.1151} cy={72.305} rx={9.035} ry={9.035} fill='#E95322' />
    </Svg>
  );
}
