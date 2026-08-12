import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import CardBackgroundShapes from '@/assets/card-background-shapes.svg';
import ChipIcon from '@/assets/card-chip-icon.svg';

import { useCreditCardStyles } from './useCreditCardStyles';

type Props = {
  cardNumber: string;
  holderName: string;
  expiryDate: string;
  style?: StyleProp<ViewStyle>;
};

export function CreditCard({ cardNumber, holderName, expiryDate, style }: Props) {
  const styles = useCreditCardStyles();

  return (
    <View style={[styles.card, style]}>
      <CardBackgroundShapes width='100%' height='100%' style={StyleSheet.absoluteFill} />

      <View style={styles.topRightBadge} />
      <ChipIcon width={30} height={26} style={styles.chip} />

      <Text style={styles.cardNumber} numberOfLines={1}>{cardNumber}</Text>

      <View style={styles.footerLeft}>
        <Text style={styles.smallLabel}>Card holder name</Text>
        <Text style={styles.boldValue} numberOfLines={1}>{holderName}</Text>
      </View>
      <View style={styles.footerRight}>
        <Text style={styles.smallLabel}>Expiry date</Text>
        <Text style={styles.boldValue}>{expiryDate}</Text>
      </View>
    </View>
  );
}
