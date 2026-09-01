import React, { JSX, useCallback, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { usePaymentScreenStyles } from './usePaymentScreenStyles';
import { router, Stack } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { ContentSheet } from '@/src/components/ContentSheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BackArrowIcon from '@/assets/back-arrow.svg';
import PencilIcon from '@/assets/Pencil.svg';
import { theme } from '@theme';

import { PAYMENT_METHOD_ICONS } from '@/src/constants/paymentMethodIcons';
import { useAuth } from '@features/auth/AuthContext';
import { useCart } from '@features/cart/CartContext';
import { computeEtaLabel } from '@features/cart/eta';
import { computeOrderTotals } from '@features/cart/orderTotals';
import { addressesApi } from '@services/addressesApi';
import { ordersApi } from '@services/ordersApi';
import { paymentMethodsApi } from '@services/paymentMethodsApi';
import { Address, PaymentMethod } from '@services/types';

const ESTIMATED_DELIVERY = '25 mins';

const PAYMENT_METHOD_NAMES: Record<PaymentMethod['type'], string> = {
  card: 'Credit Card',
  apple: 'Apple Pay',
  paypal: 'PayPal',
  google: 'Google Pay'
};

const PaymentScreen = (): JSX.Element => {
  const styles = usePaymentScreenStyles();
  const insets = useSafeAreaInsets();
  const { userId } = useAuth();
  const { items, subtotal, clear } = useCart();
  const totals = computeOrderTotals(subtotal);

  const [address, setAddress] = useState<Address | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);

  useFocusEffect(
    useCallback(() => {
      if (!userId) return;
      addressesApi
        .listForUser(userId)
        .then((addresses) => setAddress(addresses.find((a) => a.isDefault) ?? addresses[0] ?? null));
      paymentMethodsApi.listForUser(userId).then((methods) => setPaymentMethod(methods[0] ?? null));
    }, [userId])
  );

  const handlePayNow = async () => {
    if (!userId) return;

    const order = await ordersApi.create({
      userId,
      imageKey: items[0]?.imageKey ?? 'mexican-appetizer',
      items: items.map((item) => ({
        productId: item.productId,
        name: item.name,
        price: item.unitPrice,
        quantity: item.quantity,
        toppings: item.toppings
      })),
      subtotal: totals.subtotal,
      tax: totals.tax,
      delivery: totals.delivery,
      total: totals.total,
      address: address?.address ?? '',
      paymentMethodLabel: paymentMethod?.label ?? '',
      status: 'Active',
      placedAt: new Date().toISOString(),
      eta: computeEtaLabel()
    });

    clear();
    router.replace({ pathname: '/order-confirmed', params: { eta: order.eta } });
  };

  const paymentIcon = paymentMethod ? PAYMENT_METHOD_ICONS[paymentMethod.type] : null;

  return (
    <View style={styles.screen}>
      <Stack.Screen
        options={{
          header: () => (
            <View style={[styles.customHeader, { paddingTop: insets.top + 41 }]}>
              <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                <BackArrowIcon width={7} height={13} />
              </TouchableOpacity>
              <Text style={styles.title}>Payment</Text>
              <View style={styles.backBtn} />
            </View>
          )
        }}
      />
      <ContentSheet paddingBottom={insets.bottom + 40}>
        <View style={styles.contentContainer}>
          <View style={styles.shippingAddressContainer}>
            <Text style={styles.sectionLabel}>Shipping Address</Text>
            <TouchableOpacity
              onPress={() =>
                router.push({ pathname: '/delivery-address', params: { returnTo: '/payment' } })
              }
            >
              <PencilIcon width={10} height={10} />
            </TouchableOpacity>
          </View>
          <View style={styles.headerChip}>
            <Text style={styles.chipText}>{address?.address ?? 'No address on file'}</Text>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>Order Summary</Text>
            <TouchableOpacity style={styles.editButton} onPress={() => router.back()}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.orderSummaryRow}>
            <View style={styles.orderSummaryItems}>
              {items.map((item) => (
                <View style={styles.orderSummaryItemRow} key={item.cartItemId}>
                  <Text style={styles.orderSummaryItemName}>{item.name}</Text>
                  <Text style={styles.orderSummaryItemQty}>{item.quantity} items</Text>
                </View>
              ))}
            </View>
            <Text style={styles.orderSummaryTotal}>${totals.total.toFixed(2)}</Text>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>Payment Method</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => router.push('/payment-methods')}
            >
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.paymentMethodRow}>
            <View style={styles.paymentMethodInfo}>
              {paymentIcon && (
                <paymentIcon.SvgIcon
                  width={paymentIcon.iconWidth}
                  height={paymentIcon.iconHeight}
                />
              )}
              <Text style={styles.paymentMethodLabel}>
                {paymentMethod ? PAYMENT_METHOD_NAMES[paymentMethod.type] : 'No payment method'}
              </Text>
            </View>
            {paymentMethod && (
              <View style={styles.cardChip}>
                <Text style={styles.cardChipText}>
                  {paymentMethod.label}
                  {paymentMethod.expiryDate ? ` /${paymentMethod.expiryDate}` : ''}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>Delivery Time</Text>
          </View>
          <View style={styles.deliveryRow}>
            <Text style={styles.deliveryLabel}>Estimated Delivery</Text>
            <Text style={styles.deliveryValue}>{ESTIMATED_DELIVERY}</Text>
          </View>
        </View>
      </ContentSheet>
      <View
        style={[
          styles.payNowButtonWrapper,
          { bottom: insets.bottom + theme.layout.tabBarHeight + 30 }
        ]}
      >
        <TouchableOpacity style={styles.payNowButton} onPress={handlePayNow}>
          <Text style={styles.payNowButtonText}>Pay Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentScreen;
