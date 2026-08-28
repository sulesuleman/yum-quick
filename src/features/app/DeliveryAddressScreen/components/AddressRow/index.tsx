import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import HomeAddressIcon from '@/assets/home-address-icon.svg';

import { RadioButton } from '@components/RadioButton';

import { useAddressRowStyles } from './useAddressRowStyles';

type Props = {
  label: string;
  address: string;
  selected: boolean;
  onSelect: () => void;
};

export function AddressRow({ label, address, selected, onSelect }: Props) {
  const styles = useAddressRowStyles();

  return (
    <TouchableOpacity style={styles.row} onPress={onSelect} activeOpacity={0.7}>
      <HomeAddressIcon width={31} height={27} />
      <View style={styles.info}>
        <Text style={styles.label} numberOfLines={1}>
          {label}
        </Text>
        <Text style={styles.address} numberOfLines={1}>
          {address}
        </Text>
      </View>
      <RadioButton selected={selected} onPress={onSelect} />
    </TouchableOpacity>
  );
}
