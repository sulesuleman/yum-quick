import * as React from 'react';
import {
  Animated,
  Easing,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';

import { Button } from '@react-navigation/elements';
import { useEffect, useState } from 'react';
import { useAddToCartDrawerStyles } from './useAddToCartStyles';

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
              <Image source={require('@/assets/cartIcon.png')} />
            </View>
            <Text style={styles.headerText}>Cart</Text>
          </View>
          {isEmptyCart ? (
            <EmptyCart onItemPress={() => setIsEmptyCart(false)} />
          ) : (
            <AddToCartItem onItemPress={() => setIsEmptyCart(true)} />
          )}
        </View>
      </View>
    </Modal>
  );
}
const AddToCartItem = ({ onItemPress }: { onItemPress?: () => void }) => {
  const styles = useAddToCartDrawerStyles();
  const MOCK_ITEMS = [
    {
      id: '1',
      image: require('@/assets/mexican-appetizer.png'),
      name: 'Strawberry Shake',
      price: '$20.00',
      description: '',
      date: '29/11/24',
      time: '15:00',
      quantity: 2
    },
    {
      id: '2',
      image: require('@/assets/mexican-appetizer.png'),
      name: 'Broccoli Lasagna',
      price: '$12.00',
      description: '',
      date: '29/11/24',
      time: '12:00',
      quantity: 1
    }
  ];
  return (
    <View style={styles.scrollContentWithCartItems}>
      <Text style={styles.addedItemCountText}>You have 2 items in the cart</Text>
      {MOCK_ITEMS.map((item) => (
        <View style={styles.cartItem} key={item.id}>
          <Image source={item.image} style={styles.cartItemImage} />
          <View style={styles.descriptionRow}>
            <Text style={styles.descriptionText}>{item.name}</Text>
            <Text style={styles.priceText}>{item.price}</Text>
          </View>
          <View style={styles.dateRow}>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.time}>{item.time}</Text>
            <View style={styles.cartItemActions}>
              <Pressable onPress={onItemPress} style={styles.actionButton}>
                -
              </Pressable>
              <Text style={styles.descriptionText}>2</Text>
              <Pressable onPress={() => console.log('Add')} style={styles.actionButton}>
                +
              </Pressable>
            </View>
          </View>
        </View>
      ))}

      <View style={styles.rowSpaceBetween}>
        <Text style={styles.BottomRowText}>Subtotal</Text>
        <Text style={styles.BottomRowText}>$32.00</Text>
      </View>
      <View style={styles.rowSpaceBetween}>
        <Text style={styles.BottomRowText}>Tax and Fees</Text>
        <Text style={styles.BottomRowText}>$32.00</Text>
      </View>
      <View style={styles.rowSpaceBetween}>
        <Text style={styles.BottomRowText}>Delivery</Text>
        <Text style={styles.BottomRowText}>$32.00</Text>
      </View>
      <View style={styles.rowSpaceBetweenWithBorder}>
        <Text style={styles.BottomRowText}>Total</Text>
        <Text style={styles.BottomRowText}>$32.00</Text>
      </View>
      <Pressable style={styles.checkoutButton} onPress={() => onItemPress && onItemPress()}>
        <Text style={styles.checkoutButtonText}>Checkout</Text>
      </Pressable>
    </View>
  );
};
type EmptyCartProps = {
  onItemPress?: () => void;
};
const EmptyCart = ({ onItemPress }: EmptyCartProps) => {
  const styles = useAddToCartDrawerStyles();
  return (
    <View style={styles.scrollContent}>
      <TouchableOpacity onPress={onItemPress}>
        <Image source={require('@/assets/PlusIcon.png')} />
      </TouchableOpacity>
      <Text style={styles.headerText}>Want to add something?</Text>
    </View>
  );
};
