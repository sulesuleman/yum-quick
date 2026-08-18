import * as React from 'react';
import { Animated, Easing, Modal, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useEffect, useState } from 'react';

import CartIcon from '@/assets/cartIcon.svg';

import { AddToCartItem } from './components/AddToCartItem';
import { EmptyCart } from './components/EmptyCart';
import { useAddToCartDrawerStyles } from './useAddToCartDrawerStyles';

type Props = {
  visible: boolean;
  onClose: () => void;
  onItemPress?: (id: string) => void;
};

export function AddToCartModal({ visible, onClose, onItemPress }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(400));
  const [isEmptyCart, setIsEmptyCart] = useState(true);
  const styles = useAddToCartDrawerStyles();

  useEffect(() => {
    if (visible) {
      setModalVisible(true);
      slideAnim.stopAnimation();
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true
      }).start();
    } else {
      slideAnim.stopAnimation();
      Animated.timing(slideAnim, {
        toValue: 400,
        duration: 250,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true
      }).start(({ finished }) => {
        if (finished) setModalVisible(false);
      });
    }
  }, [visible]);

  return (
    <Modal visible={modalVisible} transparent animationType='none' onRequestClose={onClose}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>
        <View style={styles.drawer}>
          <View style={styles.cartHeader}>
            <View style={styles.starIcon}>
              <CartIcon width={24} height={24} />
            </View>
            <Text style={styles.headerText}>Cart</Text>
          </View>
          {isEmptyCart ? (
            <EmptyCart onItemPress={() => setIsEmptyCart(false)} />
          ) : (
            <AddToCartItem onItemPress={() => setIsEmptyCart(true)} onCheckout={onClose} />
          )}
        </View>
      </View>
    </Modal>
  );
}
