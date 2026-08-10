import React from 'react';
import { Text, View } from 'react-native';
import Svg, { Line } from 'react-native-svg';

import { theme } from '@theme';

import { IconButton } from '../button/IconButton';
import { useQuantityStepperStyles } from './useQuantityStepperStyles';

type QuantityStepperProps = {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
};

function MinusIcon() {
  return (
    <Svg width={12} height={2} viewBox='0 0 12 2'>
      <Line x1={0} y1={1} x2={12} y2={1} stroke={theme.colors.brand.primary} strokeWidth={2} strokeLinecap='round' />
    </Svg>
  );
}

function PlusIcon() {
  return (
    <Svg width={12} height={12} viewBox='0 0 12 12'>
      <Line x1={6} y1={0} x2={6} y2={12} stroke={theme.colors.text.inverse} strokeWidth={2} strokeLinecap='round' />
      <Line x1={0} y1={6} x2={12} y2={6} stroke={theme.colors.text.inverse} strokeWidth={2} strokeLinecap='round' />
    </Svg>
  );
}

export function QuantityStepper({ value, onIncrement, onDecrement, min = 1 }: QuantityStepperProps) {
  const styles = useQuantityStepperStyles();
  const canDecrement = value > min;

  return (
    <View style={styles.container} testID='quantity-stepper'>
      <IconButton
        SvgIcon={MinusIcon}
        iconWidth={12}
        iconHeight={2}
        onPress={canDecrement ? onDecrement : undefined}
        style={[styles.button, styles.minusButton, !canDecrement && styles.buttonDisabled]}
        accessibilityRole='button'
        accessibilityLabel='Decrease quantity'
        accessibilityState={{ disabled: !canDecrement }}
        testID='quantity-stepper-decrease'
      />
      <Text
        style={styles.value}
        accessibilityLabel={`Quantity: ${value}`}
        accessibilityLiveRegion='polite'
        testID='quantity-stepper-value'
      >
        {value}
      </Text>
      <IconButton
        SvgIcon={PlusIcon}
        iconWidth={12}
        iconHeight={12}
        onPress={onIncrement}
        style={[styles.button, styles.plusButton]}
        accessibilityRole='button'
        accessibilityLabel='Increase quantity'
        testID='quantity-stepper-increase'
      />
    </View>
  );
}
