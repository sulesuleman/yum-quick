import React, { JSX } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { usePaymentScreenStyles } from './usePaymentScreenStyles';
import { router, Stack } from 'expo-router';
import { ContentSheet } from '@/src/components/ContentSheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BackArrowIcon from '@/assets/back-arrow.svg';
import PencilIcon from '@/assets/Pencil.svg';
import PaymentCardIcon from '@/assets/payment-card-icon.svg';

type OrderSummaryItem = {
  id: string;
  name: string;
  quantity: number;
};

const ORDER_SUMMARY_ITEMS: OrderSummaryItem[] = [
  { id: '1', name: 'Strawberry Shake', quantity: 2 },
  { id: '2', name: 'Broccoli Lasagna', quantity: 1 }
];

const ORDER_TOTAL = 40;
const SHIPPING_ADDRESS = '778 Locust View Drive Oaklanda, CA';
const CARD_NUMBER = '*** *** *** 43';
const CARD_EXPIRY = '00/000';
const ESTIMATED_DELIVERY = '25 mins';

const PaymentScreen = (): JSX.Element => {
  const styles = usePaymentScreenStyles();
  const insets = useSafeAreaInsets();

  const handlePayNow = () => {
    router.replace('/order-confirmed');
  };

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
            <TouchableOpacity onPress={() => router.push('/delivery-address')}>
              <PencilIcon width={10} height={10} />
            </TouchableOpacity>
          </View>
          <View style={styles.headerChip}>
            <Text style={styles.chipText}>{SHIPPING_ADDRESS}</Text>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>Order Summary</Text>
            <TouchableOpacity style={styles.editButton} onPress={() => router.back()}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.orderSummaryRow}>
            <View style={styles.orderSummaryItems}>
              {ORDER_SUMMARY_ITEMS.map((item) => (
                <View style={styles.orderSummaryItemRow} key={item.id}>
                  <Text style={styles.orderSummaryItemName}>{item.name}</Text>
                  <Text style={styles.orderSummaryItemQty}>{item.quantity} items</Text>
                </View>
              ))}
            </View>
            <Text style={styles.orderSummaryTotal}>${ORDER_TOTAL.toFixed(2)}</Text>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>Payment Method</Text>
            <TouchableOpacity style={styles.editButton} onPress={() => router.push('/payment-methods')}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.paymentMethodRow}>
            <View style={styles.paymentMethodInfo}>
              <PaymentCardIcon width={26} height={18} />
              <Text style={styles.paymentMethodLabel}>Credit Card</Text>
            </View>
            <View style={styles.cardChip}>
              <Text style={styles.cardChipText}>
                {CARD_NUMBER} /{CARD_EXPIRY}
              </Text>
            </View>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>Delivery Time</Text>
          </View>
          <View style={styles.deliveryRow}>
            <Text style={styles.deliveryLabel}>Estimated Delivery</Text>
            <Text style={styles.deliveryValue}>{ESTIMATED_DELIVERY}</Text>
          </View>

          <TouchableOpacity style={styles.payNowButton} onPress={handlePayNow}>
            <Text style={styles.payNowButtonText}>Pay Now</Text>
          </TouchableOpacity>
        </View>
      </ContentSheet>
    </View>
  );
};

export default PaymentScreen;
