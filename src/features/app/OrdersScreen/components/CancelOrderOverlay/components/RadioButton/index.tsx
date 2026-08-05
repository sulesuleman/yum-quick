import React from 'react';
import { Pressable } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { theme } from '@theme';

import { useRadioButtonStyles } from './useRadioButtonStyles';

type Props = {
  selected: boolean;
  onPress: () => void;
};

export function RadioButton({ selected, onPress }: Props) {
  const styles = useRadioButtonStyles();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole='radio'
      accessibilityState={{ selected }}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <Svg width={20} height={20} viewBox='0 0 20 20'>
        <Circle cx={10} cy={10} r={9.5} stroke={theme.colors.brand.primary} strokeWidth={1} fill='none' />
        <Circle
          cx={10}
          cy={10}
          r={5.5}
          stroke={theme.colors.brand.primary}
          strokeWidth={1}
          fill={selected ? theme.colors.brand.primary : 'none'}
        />
      </Svg>
    </Pressable>
  );
}
