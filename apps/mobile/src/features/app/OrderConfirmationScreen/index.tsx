import React, { JSX, useCallback, useState } from 'react';
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { useOrdersScreenStyles } from './useOrderConfirmationStyles';
import { router, Stack } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { ContentSheet } from '@/src/components/ContentSheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BackArrowIcon from '@/assets/back-arrow.svg';
import PencilIcon from '@/assets/Pencil.svg';
import TrashIcon from '@/assets/Trash.svg';

import { resolveProductImage } from '@/src/constants/productImages';
import { useAuth } from '@features/auth/AuthContext';
import { useCart } from '@features/cart/CartContext';
import { computeOrderTotals } from '@features/cart/orderTotals';
import { addressesApi } from '@services/addressesApi';
import { Address } from '@services/types';

const OrderConfirmationScreen = (): JSX.Element => {
  const styles = useOrdersScreenStyles();
  const insets = useSafeAreaInsets();
  const { userId } = useAuth();
  const { items, subtotal, incrementItem, decrementItem, removeItem, openDrawer } = useCart();
  const [address, setAddress] = useState<Address | null>(null);

  useFocusEffect(
    useCallback(() => {
      if (!userId) return;
      addressesApi
        .listForUser(userId)
        .then((addresses) => setAddress(addresses.find((a) => a.isDefault) ?? addresses[0] ?? null));
    }, [userId])
  );

  const totals = computeOrderTotals(subtotal);

  const handlePlaceOrder = () => {
    router.push('/payment');
  };

  return (
    <View style={styles.screen}>
      <Stack.Screen
        options={{
          header: () => (
            <View style={[styles.customHeader, { paddingTop: insets.top + 41 }]}>
              <TouchableOpacity
                onPress={() => {
                  router.back();
                  openDrawer();
                }}
                style={styles.backBtn}
              >
                <BackArrowIcon width={7} height={13} />
              </TouchableOpacity>
              <Text style={styles.title}>Confirm Order</Text>
              <View style={styles.backBtn} />
            </View>
          )
        }}
      />
      <ContentSheet paddingBottom={insets.bottom + 40}>
        <View style={styles.contentContainer}>
          <View style={styles.shippingAddressContainer}>
            <Text style={styles.shippingAddressLabel}>Shipping Address</Text>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: '/delivery-address',
                  params: { returnTo: '/order-confirmation' }
                })
              }
            >
              <PencilIcon width={10} height={10} />
            </TouchableOpacity>
          </View>
          <View style={styles.headerChip}>
            <Text style={styles.chipText}>{address?.address ?? 'No address on file'}</Text>
          </View>

          <View style={styles.orderSummaryHeader}>
            <Text style={styles.sectionLabel}>Order Summary</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => {
                router.back();
                openDrawer();
              }}
            >
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.orderSummaryDivider} />

          {items.map((item) => (
            <View style={styles.orderItem} key={item.cartItemId}>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => removeItem(item.cartItemId)}
              >
                <TrashIcon width={12} height={13} />
              </TouchableOpacity>
              <Image source={resolveProductImage(item.imageKey)} style={styles.orderItemImage} />
              <View style={styles.orderItemDetails}>
                <View style={styles.orderItemTopRow}>
                  <Text style={styles.orderItemName}>{item.name}</Text>
                  <Text style={styles.orderItemPrice}>${item.unitPrice.toFixed(2)}</Text>
                </View>
                <View style={styles.orderItemMetaRow}>
                  <Text style={styles.orderItemMeta}>{item.quantity} items</Text>
                </View>
                <View style={styles.orderItemActionsRow}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => removeItem(item.cartItemId)}
                  >
                    <Text style={styles.cancelButtonText}>Cancel Order</Text>
                  </TouchableOpacity>
                  <View style={styles.stepper}>
                    <Pressable
                      style={styles.stepperButton}
                      onPress={() => decrementItem(item.cartItemId)}
                    >
                      <Text style={styles.stepperButtonText}>-</Text>
                    </Pressable>
                    <Text style={styles.stepperCount}>{item.quantity}</Text>
                    <Pressable
                      style={styles.stepperButton}
                      onPress={() => incrementItem(item.cartItemId)}
                    >
                      <Text style={styles.stepperButtonText}>+</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          ))}
          <View style={styles.summarySection}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${totals.subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax and Fees</Text>
              <Text style={styles.summaryValue}>${totals.tax.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery</Text>
              <Text style={styles.summaryValue}>${totals.delivery.toFixed(2)}</Text>
            </View>
          </View>
          <View style={styles.totalDivider} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${totals.total.toFixed(2)}</Text>
          </View>

          <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
            <Text style={styles.placeOrderButtonText}>Place Order</Text>
          </TouchableOpacity>
        </View>
      </ContentSheet>
    </View>
  );
};

export default OrderConfirmationScreen;
