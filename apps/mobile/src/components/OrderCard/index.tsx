import React from 'react';
import {
  ImageSourcePropType,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native';

import OrderCancelledCross from '@/assets/order-cancelled-cross.svg';
import OrderDeliveredCheck from '@/assets/order-delivered-check.svg';

import { FoodImage } from '@components/FoodImage';

import { useOrderCardStyles } from './useOrderCardStyles';

export type OrderCardActionVariant = 'solid' | 'light';

export type OrderCardAction = {
  label: string;
  onPress: () => void;
  variant?: OrderCardActionVariant;
};

export type OrderCardStatusIcon = 'check' | 'cross';

export type OrderCardStatus = {
  label: string;
  icon?: OrderCardStatusIcon;
};

type Props = {
  name: string;
  price: number;
  image?: ImageSourcePropType;
  date?: string;
  itemCount?: number;
  showPrice?: boolean;
  status?: OrderCardStatus;
  actions?: OrderCardAction[];
  style?: StyleProp<ViewStyle>;
};

export function OrderCard({
  name,
  price,
  image,
  date,
  itemCount,
  showPrice = false,
  status,
  actions,
  style
}: Props) {
  const styles = useOrderCardStyles();

  if (showPrice) {
    return <FoodImage source={image} showPrice price={price} style={style} />;
  }

  return (
    <View style={[styles.card, style]}>
      <FoodImage source={image} showPrice price={price} />
      <View style={styles.info}>
        <View style={styles.topRow}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.price}>${price.toFixed(2)}</Text>
        </View>
        {(date || itemCount !== undefined) && (
          <View style={styles.metaRow}>
            {date && <Text style={styles.meta}>{date}</Text>}
            {itemCount !== undefined && (
              <Text style={styles.meta}>
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </Text>
            )}
          </View>
        )}
        {status && (
          <View style={styles.statusRow}>
            {status.icon === 'check' && <OrderDeliveredCheck width={13} height={13} />}
            {status.icon === 'cross' && <OrderCancelledCross width={13} height={13} />}
            <Text style={styles.statusText}>{status.label}</Text>
          </View>
        )}
        {actions && actions.length > 0 && (
          <View style={styles.buttonsRow}>
            {actions.map((action) => (
              <TouchableOpacity
                key={action.label}
                style={action.variant === 'light' ? styles.actionLight : styles.actionSolid}
                onPress={action.onPress}
                activeOpacity={0.8}
              >
                <Text
                  style={
                    action.variant === 'light' ? styles.actionTextLight : styles.actionTextSolid
                  }
                >
                  {action.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}
