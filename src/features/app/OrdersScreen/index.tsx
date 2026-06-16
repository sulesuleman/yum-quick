import { useState } from 'react';
import { ImageSourcePropType, Text, TouchableOpacity, View } from 'react-native';
import { Stack, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BackArrowIcon from '@/assets/back-arrow.svg';

import { ContentSheet } from '@components/ContentSheet';
import { OrderCard } from '@components/OrderCard';

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

const MOCK_ORDERS: Order[] = [
  {
    id: '1',
    name: 'Strawberry shake',
    price: 20.0,
    date: '29 Nov, 01:20 pm',
    itemCount: 2,
    image: { uri: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=200' },
    status: 'Active'
  }
];

export function OrdersScreen() {
  const styles = useOrdersScreenStyles();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<OrderTab>('Active');

  const filteredOrders = MOCK_ORDERS.filter((o) => o.status === activeTab);

  return (
    <View style={styles.screen}>
      <Stack.Screen
        options={{
          header: () => (
            <View style={[styles.customHeader, { paddingTop: insets.top + 30 }]}>
              <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                <BackArrowIcon width={12} height={12} />
              </TouchableOpacity>
              <Text style={styles.title}>My Orders</Text>
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
              onCancel={() => {}}
              onTrack={() => {}}
            />
          ))
        )}
      </ContentSheet>
    </View>
  );
}

