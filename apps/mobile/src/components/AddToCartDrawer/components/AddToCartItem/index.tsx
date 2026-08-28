import * as React from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { router } from 'expo-router';

import { resolveProductImage } from '@/src/constants/productImages';
import { useCart } from '@features/cart/CartContext';
import { computeOrderTotals } from '@features/cart/orderTotals';

import { useAddToCartItemStyles } from './useAddToCartItemStyles';

type Props = {
  onCheckout: () => void;
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getFullYear()).slice(-2)}`;
}

function formatTime(iso: string) {
  const d = new Date(iso);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export function AddToCartItem({ onCheckout }: Props) {
  const styles = useAddToCartItemStyles();
  const { items, subtotal, incrementItem, decrementItem } = useCart();
  const totals = computeOrderTotals(subtotal);

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.scrollContentWithCartItems}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.addedItemCountText}>
        You have {items.reduce((sum, item) => sum + item.quantity, 0)} items in the cart
      </Text>
      {items.map((item) => (
        <View style={styles.cartItem} key={item.cartItemId}>
          <Image source={resolveProductImage(item.imageKey)} style={styles.cartItemImage} />
          <View style={styles.descriptionRow}>
            <Text style={styles.descriptionText}>{item.name}</Text>
            <Text style={styles.priceText}>${item.unitPrice.toFixed(2)}</Text>
          </View>
          <View style={styles.dateRow}>
            <Text style={styles.date}>{formatDate(item.addedAt)}</Text>
            <Text style={styles.time}>{formatTime(item.addedAt)}</Text>
            <View style={styles.cartItemActions}>
              <Pressable onPress={() => decrementItem(item.cartItemId)} style={styles.actionButton}>
                <Text style={styles.actionButtonText}>-</Text>
              </Pressable>
              <Text style={styles.descriptionText}>{item.quantity}</Text>
              <Pressable onPress={() => incrementItem(item.cartItemId)} style={styles.actionButton}>
                <Text style={styles.actionButtonText}>+</Text>
              </Pressable>
            </View>
          </View>
        </View>
      ))}

      <View style={styles.summaryRows}>
        <View style={styles.rowSpaceBetween}>
          <Text style={styles.BottomRowText}>Subtotal</Text>
          <Text style={styles.BottomRowText}>${totals.subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.rowSpaceBetween}>
          <Text style={styles.BottomRowText}>Tax and Fees</Text>
          <Text style={styles.BottomRowText}>${totals.tax.toFixed(2)}</Text>
        </View>
        <View style={styles.rowSpaceBetween}>
          <Text style={styles.BottomRowText}>Delivery</Text>
          <Text style={styles.BottomRowText}>${totals.delivery.toFixed(2)}</Text>
        </View>
      </View>
      <View style={styles.dashedDivider} />
      <View style={styles.rowSpaceBetweenTotal}>
        <Text style={styles.BottomRowText}>Total</Text>
        <Text style={styles.BottomRowText}>${totals.total.toFixed(2)}</Text>
      </View>
      <Pressable
        style={styles.checkoutButton}
        onPress={() => {
          onCheckout();
          router.push('/order-confirmation');
        }}
      >
        <Text style={styles.checkoutButtonText}>Checkout</Text>
      </Pressable>
    </ScrollView>
  );
}
