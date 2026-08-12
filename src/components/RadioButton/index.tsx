import React from 'react';
import { AccessibilityRole, Pressable } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { theme } from '@theme';

import { useRadioButtonStyles } from './useRadioButtonStyles';

type Props = {
  selected: boolean;
  onPress: () => void;
  /**
   * Defaults to 'radio' (single-select group semantics, e.g. address/cancel-reason lists).
   * Pass 'checkbox' for independent multi-select toggles (e.g. topping list) so screen
   * readers announce the correct semantics instead of implying mutual exclusivity.
   */
  accessibilityRole?: AccessibilityRole;
  accessibilityLabel?: string;
  testID?: string;
};

export function RadioButton({
  selected,
  onPress,
  accessibilityRole = 'radio',
  accessibilityLabel,
  testID
}: Props) {
  const styles = useRadioButtonStyles();
  const accessibilityState =
    accessibilityRole === 'checkbox' ? { checked: selected } : { selected };

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole={accessibilityRole}
      accessibilityState={accessibilityState}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      hitSlop={8}
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
