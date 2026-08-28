import React, { JSX } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BackArrowIcon from '@/assets/back-arrow.svg';
import { theme } from '@theme';
import { ConfirmedRing } from './components/ConfirmedRing';
import { useOrderConfirmedScreenStyles } from './useOrderConfirmedScreenStyles';

const DEFAULT_DELIVERY_ETA = 'Thu, 29th, 4:00 PM';

const OrderConfirmedScreen = (): JSX.Element => {
  const styles = useOrderConfirmedScreenStyles();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ eta?: string }>();
  const deliveryEta = params.eta || DEFAULT_DELIVERY_ETA;

  const handleTrackOrder = () => {
    router.replace('/my-orders');
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
            </View>
          )
        }}
      />
      <View style={styles.content}>
        <ConfirmedRing />
        <Text style={styles.title}>¡Order Confirmed!</Text>
        <Text style={styles.subtitle}>Your order has been placed succesfully</Text>
        <Text style={styles.deliveryText}>Delivery by {deliveryEta}</Text>
        <TouchableOpacity onPress={handleTrackOrder}>
          <Text style={styles.trackLink}>Track my order</Text>
        </TouchableOpacity>
      </View>
      <Text
        style={[
          styles.supportNote,
          { marginBottom: insets.bottom + theme.layout.tabBarHeight + 56 }
        ]}
      >
        If you have any questions, please reach out directly to our customer support
      </Text>
    </View>
  );
};

export default OrderConfirmedScreen;
