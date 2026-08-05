import { useState } from 'react';
import { ImageSourcePropType, Text, TouchableOpacity, View } from 'react-native';
import { Stack, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BackArrowIcon from '@/assets/back-arrow.svg';

import { ContentSheet } from '@components/ContentSheet';
import { OrderCard, OrderCardAction, OrderCardStatus } from '@components/OrderCard';

import { CancelOrderOverlay, CancelOrderStep } from './components/CancelOrderOverlay';
import { EmptyOrders } from './components/EmptyOrders';
import { OrderTab, OrderTabs } from './components/OrderTabs';
import { useOrdersScreenStyles } from './useOrdersScreenStyles';

type Order = {
  id: string;
  name: string;
  price: number;
  date: string;
  itemCount: number;
  image?: ImageSourcePropType;
  status: OrderTab;
};

const INITIAL_ORDERS: Order[] = [
  {
    id: '1',
    name: 'Strawberry shake',
    price: 20.0,
    date: '29 Nov, 01:20 pm',
    itemCount: 2,
    image: { uri: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=200' },
    status: 'Active'
  },
  {
    id: '2',
    name: 'Chicken Curry',
    price: 50.0,
    date: '29 Nov, 01:20 pm',
    itemCount: 2,
    image: { uri: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=200' },
    status: 'Completed'
  },
  {
    id: '3',
    name: 'Bean and Vegetable Burger',
    price: 50.0,
    date: '10 Nov, 06:05 pm',
    itemCount: 2,
    image: { uri: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=200' },
    status: 'Completed'
  },
  {
    id: '4',
    name: 'Coffee Latte',
    price: 8.0,
    date: '10 Nov, 08:30 am',
    itemCount: 1,
    image: { uri: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200' },
    status: 'Completed'
  },
  {
    id: '5',
    name: 'Strawberry Cheesecake',
    price: 22.0,
    date: '03 Oct, 03:40 pm',
    itemCount: 2,
    image: { uri: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=200' },
    status: 'Completed'
  }
];

export function OrdersScreen() {
  const styles = useOrdersScreenStyles();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<OrderTab>('Active');
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [cancelTargetId, setCancelTargetId] = useState<string | null>(null);
  const [cancelStep, setCancelStep] = useState<CancelOrderStep>('form');

  const filteredOrders = orders.filter((o) => o.status === activeTab);
  const cancellingOrder = orders.find((o) => o.id === cancelTargetId);
  const isCancelling = cancellingOrder !== undefined;

  const getStatus = (status: OrderTab): OrderCardStatus | undefined => {
    if (status === 'Completed') return { label: 'Order delivered', icon: 'check' };
    if (status === 'Cancelled') return { label: 'Order cancelled', icon: 'cross' };
    return undefined;
  };

  const getActions = (order: Order): OrderCardAction[] => {
    if (order.status === 'Active') {
      return [
        { label: 'Cancel Order', variant: 'solid', onPress: () => setCancelTargetId(order.id) },
        { label: 'Track Driver', variant: 'light', onPress: () => {} }
      ];
    }
    if (order.status === 'Completed') {
      return [
        { label: 'Leave a review', variant: 'solid', onPress: () => {} },
        { label: 'Order Again', variant: 'light', onPress: () => {} }
      ];
    }
    return [];
  };

  const handleOrderCancelled = () => {
    if (!cancelTargetId) return;
    setOrders((prev) =>
      prev.map((o) => (o.id === cancelTargetId ? { ...o, status: 'Cancelled' as OrderTab } : o))
    );
  };

  return (
    <View style={styles.screen}>
      <Stack.Screen
        options={{
          header: () => (
            <View style={[styles.customHeader, { paddingTop: insets.top + 30 }]}>
              <TouchableOpacity
                onPress={() => (isCancelling ? setCancelTargetId(null) : router.back())}
                style={styles.backBtn}
              >
                <BackArrowIcon width={12} height={12} />
              </TouchableOpacity>
              <Text style={styles.title}>
                {isCancelling ? (cancelStep === 'form' ? 'Cancel Order' : '') : 'My Orders'}
              </Text>
              <View style={styles.backBtn} />
            </View>
          )
        }}
      />
      <ContentSheet contentStyle={filteredOrders.length === 0 ? styles.emptyContent : undefined}>
        <OrderTabs activeTab={activeTab} onTabChange={setActiveTab} />
        {filteredOrders.length === 0 ? (
          <EmptyOrders />
        ) : (
          filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              name={order.name}
              price={order.price}
              date={order.date}
              itemCount={order.itemCount}
              image={order.image}
              status={getStatus(order.status)}
              actions={getActions(order)}
            />
          ))
        )}
      </ContentSheet>

      <CancelOrderOverlay
        visible={isCancelling}
        step={cancelStep}
        onStepChange={setCancelStep}
        onClose={() => setCancelTargetId(null)}
        onCancelled={handleOrderCancelled}
      />
    </View>
  );
}
