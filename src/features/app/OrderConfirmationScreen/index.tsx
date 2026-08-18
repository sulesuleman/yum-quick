import React, { JSX, useState } from 'react';
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { useOrdersScreenStyles } from './useOrderConfirmationStyles';
import { router, Stack } from 'expo-router';
import { ContentSheet } from '@/src/components/ContentSheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BackArrowIcon from '@/assets/back-arrow.svg';
import PencilIcon from '@/assets/Pencil.svg';
import TrashIcon from '@/assets/Trash.svg';

type OrderItem = {
  id: string;
  image: any;
  name: string;
  price: number;
  date: string;
  time: string;
  quantity: number;
};

const INITIAL_ORDER_ITEMS: OrderItem[] = [
  {
    id: '1',
    image: require('@/assets/mexican-appetizer.png'),
    name: 'Strawberry Shake',
    price: 20,
    date: '29 Nov',
    time: '15:20 pm',
    quantity: 2
  },
  {
    id: '2',
    image: require('@/assets/mexican-appetizer.png'),
    name: 'Broccoli Lasagna',
    price: 12.99,
    date: '29 Nov',
    time: '12:00 pm',
    quantity: 1
  }
];

const TAX_AND_FEES = 5;
const DELIVERY_FEE = 3;
const SHIPPING_ADDRESS = '778 Locust View Drive Oaklanda, CA';

const OrderConfirmationScreen = (): JSX.Element => {
  const styles = useOrdersScreenStyles();
  const insets = useSafeAreaInsets();
  const [orderItems, setOrderItems] = useState<OrderItem[]>(INITIAL_ORDER_ITEMS);

  const handleIncrement = (id: string) => {
    setOrderItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)));
  };

  const handleDecrement = (id: string) => {
    setOrderItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item))
    );
  };

  const handleCancelOrder = (id: string) => {
    setOrderItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + TAX_AND_FEES + DELIVERY_FEE;

  const handlePlaceOrder = () => {
    router.push('/payment');
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
              <Text style={styles.title}>Confirm Order</Text>
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

          <View style={styles.orderSummaryHeader}>
            <Text style={styles.sectionLabel}>Order Summary</Text>
            <TouchableOpacity style={styles.editButton} onPress={() => router.back()}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>

          {orderItems.map((item) => (
            <View style={styles.orderItem} key={item.id}>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleCancelOrder(item.id)}>
                <TrashIcon width={12} height={13} />
              </TouchableOpacity>
              <Image source={item.image} style={styles.orderItemImage} />
              <View style={styles.orderItemDetails}>
                <View style={styles.orderItemTopRow}>
                  <Text style={styles.orderItemName}>{item.name}</Text>
                  <Text style={styles.orderItemPrice}>${item.price.toFixed(2)}</Text>
                </View>
                <View style={styles.orderItemMetaRow}>
                  <Text style={styles.orderItemMeta}>
                    {item.date}, {item.time}
                  </Text>
                  <Text style={styles.orderItemMeta}>{item.quantity} items</Text>
                </View>
                <View style={styles.orderItemActionsRow}>
                  <TouchableOpacity style={styles.cancelButton} onPress={() => handleCancelOrder(item.id)}>
                    <Text style={styles.cancelButtonText}>Cancel Order</Text>
                  </TouchableOpacity>
                  <View style={styles.stepper}>
                    <Pressable style={styles.stepperButton} onPress={() => handleDecrement(item.id)}>
                      <Text style={styles.stepperButtonText}>-</Text>
                    </Pressable>
                    <Text style={styles.stepperCount}>{item.quantity}</Text>
                    <Pressable style={styles.stepperButton} onPress={() => handleIncrement(item.id)}>
                      <Text style={styles.stepperButtonText}>+</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          ))}
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax and Fees</Text>
            <Text style={styles.summaryValue}>${TAX_AND_FEES.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery</Text>
            <Text style={styles.summaryValue}>${DELIVERY_FEE.toFixed(2)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
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
