import React, { useEffect, useState } from 'react';
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
import { resolveProductImage } from '@/src/constants/productImages';
import { useCart } from '@features/cart/CartContext';
import { useFavorites } from '@features/favorites/useFavorites';
import { productsApi } from '@services/productsApi';
import { Product, Topping } from '@services/types';
import { theme } from '@theme';

import { ToppingRow } from './components/ToppingRow';
import { useProductDetailsScreenStyles } from './useProductDetailsScreenStyles';

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
  const { addItem } = useCart();
  const { isFavorite, toggle } = useFavorites();

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedToppings, setSelectedToppings] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!params.id) return;
    productsApi.get(params.id).then((fetched) => {
      setProduct(fetched);
      setSelectedToppings(getInitialToppingSelection(fetched.toppings));
    });
  }, [params.id]);

  if (!product) {
    return <View style={styles.screen} />;
  }

  const toppingsTotal = product.toppings.reduce(
    (sum, topping) => sum + (selectedToppings[topping.id] ? topping.price : 0),
    0
  );
  const totalPrice = product.price * quantity + toppingsTotal;
  const productIsFavorite = isFavorite(product.id);

  const toggleTopping = (id: string) =>
    setSelectedToppings((prev) => ({ ...prev, [id]: !prev[id] }));

  const handleAddToCart = () => {
    const chosenToppings = product.toppings.filter((topping) => selectedToppings[topping.id]);
    addItem(product, quantity, chosenToppings);
    router.back();
  };

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
                  onPress={() => toggle(product.id)}
                  style={styles.favoriteIcon}
                  accessibilityRole='button'
                  accessibilityLabel={
                    productIsFavorite ? 'Remove from favorites' : 'Add to favorites'
                  }
                  accessibilityState={{ selected: productIsFavorite }}
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
            source={resolveProductImage(product.imageKey)}
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

      <View style={[styles.ctaWrapper, { bottom: insets.bottom + theme.layout.tabBarHeight + 32 }]}>
        <Button
          title='Add to Cart'
          variant='cta'
          fullWidth={false}
          style={styles.ctaButton}
          labelStyle={styles.ctaButtonLabel}
          SvgIcon={BagIcon}
          iconWidth={16}
          iconHeight={16}
          onPress={handleAddToCart}
          accessibilityLabel={`Add to Cart, total $${totalPrice.toFixed(2)}`}
          testID='product-details-add-to-cart-button'
        />
      </View>
    </View>
  );
}
