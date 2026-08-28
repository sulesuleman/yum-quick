import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import type { SvgProps } from 'react-native-svg';

import { RadioButton } from '@components/RadioButton';

import { usePaymentMethodRowStyles } from './usePaymentMethodRowStyles';

type Props = {
  SvgIcon: React.FC<SvgProps>;
  iconWidth: number;
  iconHeight: number;
  label: string;
  selected: boolean;
  onSelect: () => void;
};

export function PaymentMethodRow({
  SvgIcon,
  iconWidth,
  iconHeight,
  label,
  selected,
  onSelect
}: Props) {
  const styles = usePaymentMethodRowStyles();

  return (
    <TouchableOpacity style={styles.row} onPress={onSelect} activeOpacity={0.7}>
      <View style={styles.iconBox}>
        <SvgIcon width={iconWidth} height={iconHeight} />
      </View>
      <Text style={styles.label} numberOfLines={1}>
        {label}
      </Text>
      <RadioButton selected={selected} onPress={onSelect} />
    </TouchableOpacity>
  );
}
