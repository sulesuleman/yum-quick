import * as React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';

import { useAddToCartItemStyles } from './useAddToCartItemStyles';

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

type Props = {
  onItemPress?: () => void;
  onCheckout: () => void;
};

export function AddToCartItem({ onItemPress, onCheckout }: Props) {
  const styles = useAddToCartItemStyles();

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
      <Pressable
        style={styles.checkoutButton}
        onPress={() => {
          onCheckout();
          router.push('/order-confirmation');
        }}
      >
        <Text style={styles.checkoutButtonText}>Checkout</Text>
      </Pressable>
    </View>
  );
}
