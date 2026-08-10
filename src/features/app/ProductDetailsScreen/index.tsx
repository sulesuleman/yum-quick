import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BackArrowIcon from '@/assets/back-arrow.svg';
import HeartIcon from '@/assets/heart-icon.svg';
import StarIcon from '@/assets/star-icon.svg';
import BagIcon from '@/assets/bag-icon.svg';

import { ContentSheet } from '@components/ContentSheet';
import { ImageCard } from '@components/Cards/ImageCard';
import { Button, IconButton } from '@components/ui/button';
import { QuantityStepper } from '@components/ui/QuantityStepper';
import { theme } from '@theme';

import { ToppingRow } from './components/ToppingRow';
import { useProductDetailsScreenStyles } from './useProductDetailsScreenStyles';

type Topping = {
  id: string;
  name: string;
  price: number;
  defaultSelected: boolean;
};

type ProductMock = {
  name: string;
  rating: number;
  subtitle: string;
  description: string;
  basePrice: number;
  image: ReturnType<typeof require>;
  toppings: Topping[];
};

const DEFAULT_TOPPINGS: Topping[] = [
  { id: 'guacamole', name: 'Guacamole', price: 2.99, defaultSelected: false },
  { id: 'jalapenos', name: 'Jalapeños', price: 3.99, defaultSelected: true },
  { id: 'ground-beef', name: 'Ground Beef', price: 3.99, defaultSelected: false },
  { id: 'pico-de-gallo', name: 'Pico de Gallo', price: 2.99, defaultSelected: false }
];

const MOCK_PRODUCTS: Record<string, ProductMock> = {
  '1': {
    name: 'Mexican Appetizer',
    rating: 5.0,
    subtitle: 'Tortilla Chips With Toppins',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
    basePrice: 50.0,
    image: require('@/assets/mexican-appetizer.png'),
    toppings: DEFAULT_TOPPINGS
  }
};

const DEFAULT_PRODUCT = MOCK_PRODUCTS['1'];

function getInitialToppingSelection(toppings: Topping[]): Record<string, boolean> {
  return toppings.reduce<Record<string, boolean>>((acc, topping) => {
    acc[topping.id] = topping.defaultSelected;
    return acc;
  }, {});
}

export function ProductDetailsScreen() {
  const styles = useProductDetailsScreenStyles();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ id?: string }>();

  const product = (params.id && MOCK_PRODUCTS[params.id]) || DEFAULT_PRODUCT;

  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedToppings, setSelectedToppings] = useState<Record<string, boolean>>(
    getInitialToppingSelection(product.toppings)
  );

  const toppingsTotal = product.toppings.reduce(
    (sum, topping) => sum + (selectedToppings[topping.id] ? topping.price : 0),
    0
  );
  const totalPrice = product.basePrice * quantity + toppingsTotal;

  const toggleTopping = (id: string) =>
    setSelectedToppings((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <View style={styles.screen}>
      <Stack.Screen
        options={{
          header: () => (
            <View style={[styles.customHeader, { paddingTop: insets.top + 47 }]}>
              <View style={styles.headerTopRow}>
                <IconButton
                  SvgIcon={BackArrowIcon}
                  iconWidth={7}
                  iconHeight={13}
                  onPress={() => router.back()}
                  style={styles.headerIcon}
                  accessibilityRole='button'
                  accessibilityLabel='Go back'
                  testID='product-details-back-button'
                />
                <View style={styles.titleLeft}>
                  <Text style={styles.headerTitle} numberOfLines={1}>
                    {product.name}
                  </Text>
                  <View
                    style={styles.titleDot}
                    importantForAccessibility='no-hide-descendants'
                    accessibilityElementsHidden
                  />
                </View>
                <IconButton
                  SvgIcon={HeartIcon}
                  iconWidth={12}
                  iconHeight={10}
                  iconColor={theme.colors.text.inverse}
                  onPress={() => setIsFavorite((prev) => !prev)}
                  style={styles.favoriteIcon}
                  accessibilityRole='button'
                  accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                  accessibilityState={{ selected: isFavorite }}
                  testID='product-details-favorite-button'
                />
              </View>
              <View
                style={styles.ratingPill}
                accessibilityRole='text'
                accessibilityLabel={`Rating ${product.rating.toFixed(1)} out of 5`}
              >
                <StarIcon
                  width={10}
                  height={10}
                  importantForAccessibility='no-hide-descendants'
                  accessibilityElementsHidden
                />
                <Text
                  style={styles.ratingText}
                  importantForAccessibility='no-hide-descendants'
                  accessibilityElementsHidden
                >
                  {product.rating.toFixed(1)}
                </Text>
              </View>
            </View>
          )
        }}
      />

      <ContentSheet
        paddingBottom={insets.bottom + theme.layout.tabBarHeight + 120}
        contentStyle={styles.sheetContent}
      >
        <View style={styles.imageWrapper}>
          <ImageCard
            source={product.image}
            style={styles.image}
            borderRadius={36}
            accessibilityLabel={product.name}
          />
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.price}>${totalPrice.toFixed(2)}</Text>
          <QuantityStepper
            value={quantity}
            onIncrement={() => setQuantity((prev) => prev + 1)}
            onDecrement={() => setQuantity((prev) => Math.max(1, prev - 1))}
          />
        </View>

        <View style={styles.divider} />

        <Text style={styles.subtitle}>{product.subtitle}</Text>
        <Text style={styles.description}>{product.description}</Text>

        <Text style={styles.sectionTitle}>Toppings</Text>

        <View style={styles.toppingsList}>
          {product.toppings.map((topping) => (
            <ToppingRow
              key={topping.id}
              name={topping.name}
              price={topping.price}
              selected={!!selectedToppings[topping.id]}
              onPress={() => toggleTopping(topping.id)}
            />
          ))}
        </View>
      </ContentSheet>

      <View
        style={[
          styles.ctaWrapper,
          { bottom: insets.bottom + theme.layout.tabBarHeight + 32 }
        ]}
      >
        <Button
          title='Add to Cart'
          variant='cta'
          fullWidth={false}
          style={styles.ctaButton}
          labelStyle={styles.ctaButtonLabel}
          SvgIcon={BagIcon}
          iconWidth={16}
          iconHeight={16}
          accessibilityLabel={`Add to Cart, total $${totalPrice.toFixed(2)}`}
          testID='product-details-add-to-cart-button'
        />
      </View>
    </View>
  );
}
