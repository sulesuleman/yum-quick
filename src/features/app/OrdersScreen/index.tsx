import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Stack, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BackArrowIcon from '@/assets/back-arrow.svg';

import { ContentSheet } from '@components/ContentSheet';
import { OrderCard, OrderCardAction, OrderCardStatus } from '@components/OrderCard';
import { resolveProductImage } from '@/src/constants/productImages';
import { useAuth } from '@features/auth/AuthContext';
import { ordersApi } from '@services/ordersApi';
import { Order } from '@services/types';

import { CancelOrderOverlay, CancelOrderStep } from './components/CancelOrderOverlay';
import { EmptyOrders } from './components/EmptyOrders';
import { OrderTab, OrderTabs } from './components/OrderTabs';
import { useOrdersScreenStyles } from './useOrdersScreenStyles';

function formatOrderDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit'
  });
}

export function OrdersScreen() {
  const styles = useOrdersScreenStyles();
  const insets = useSafeAreaInsets();
  const { userId } = useAuth();
  const [activeTab, setActiveTab] = useState<OrderTab>('Active');
  const [orders, setOrders] = useState<Order[]>([]);
  const [cancelTargetId, setCancelTargetId] = useState<string | null>(null);
  const [cancelStep, setCancelStep] = useState<CancelOrderStep>('form');

  useEffect(() => {
    if (!userId) return;
    ordersApi.listForUser(userId).then(setOrders);
  }, [userId]);

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

  const handleOrderCancelled = async (reason: string) => {
    if (!cancelTargetId) return;
    const updated = await ordersApi.updateStatus(cancelTargetId, 'Cancelled', reason);
    setOrders((prev) => prev.map((o) => (o.id === cancelTargetId ? updated : o)));
  };

  return (
    <View style={styles.screen}>
      <Stack.Screen
        options={{
          header: () => (
            <View style={[styles.customHeader, { paddingTop: insets.top + 41 }]}>
              <TouchableOpacity
                onPress={() => (isCancelling ? setCancelTargetId(null) : router.back())}
                style={styles.backBtn}
              >
                <BackArrowIcon width={7} height={13} />
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
          <EmptyOrders tab={activeTab} />
        ) : (
          filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              name={order.items[0]?.name ?? 'Order'}
              price={order.total}
              date={formatOrderDate(order.placedAt)}
              itemCount={order.items.reduce((sum, item) => sum + item.quantity, 0)}
              image={resolveProductImage(order.imageKey)}
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
