import React, { useEffect, useState } from 'react';
import { Text, useWindowDimensions, View } from 'react-native';
import { Stack, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BackArrowIcon from '@/assets/back-arrow.svg';

import { ContentSheet } from '@components/ContentSheet';
import { IconButton } from '@components/ui/button/IconButton';
import { BestSellerCard } from '@components/Cards/BestSellerCard';
import { resolveProductImage } from '@/src/constants/productImages';
import { useFavorites } from '@features/favorites/useFavorites';
import { productsApi } from '@services/productsApi';
import { Product } from '@services/types';
import { theme } from '@theme';

import { useBestSellerScreenStyles } from './useBestSellerScreenStyles';

const GRID_GAP = 7;
/** Must match useBestSellerScreenStyles' sheetContent.paddingHorizontal exactly. */
const SCREEN_MARGIN = 35;

function getNumColumns(windowWidth: number): number {
  if (windowWidth >= 1024) return 4;
  if (windowWidth >= 700) return 3;
  return 2;
}

export function BestSellerScreen() {
  const insets = useSafeAreaInsets();
  const styles = useBestSellerScreenStyles();
  const { width: windowWidth } = useWindowDimensions();
  const { isFavorite, toggle } = useFavorites();
  const [bestSellers, setBestSellers] = useState<Product[]>([]);

  useEffect(() => {
    productsApi.list().then((products) => setBestSellers(products.filter((p) => p.isBestSeller)));
  }, []);

  const numColumns = getNumColumns(windowWidth);
  const availableWidth = windowWidth - SCREEN_MARGIN * 2;
  const cardWidth = (availableWidth - GRID_GAP * (numColumns - 1)) / numColumns;

  return (
    <View style={styles.screen}>
      <Stack.Screen
        options={{
          header: () => (
            <View style={[styles.customHeader, { paddingTop: insets.top + 46 }]}>
              <IconButton
                SvgIcon={BackArrowIcon}
                iconWidth={7}
                iconHeight={13}
                onPress={() => router.back()}
                style={styles.headerIcon}
                accessibilityRole='button'
                accessibilityLabel='Go back'
                testID='best-seller-back-button'
              />
              <View style={styles.headerTextGroup}>
                <Text style={styles.headerTitle}>Best Seller</Text>
              </View>
              <View style={styles.headerSpacer} />
            </View>
          )
        }}
      />

      <ContentSheet
        paddingBottom={insets.bottom + theme.layout.tabBarHeight + theme.spacing.lg}
        contentStyle={styles.sheetContent}
      >
        <Text style={styles.headerSubtitle}>Discover our most popular dishes!</Text>
        <View style={styles.grid}>
          {bestSellers.map((item) => (
            <BestSellerCard
              key={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              rating={item.rating}
              category={item.category}
              image={resolveProductImage(item.imageKey)}
              width={cardWidth}
              isFavorite={isFavorite(item.id)}
              onToggleFavorite={() => toggle(item.id)}
              onPress={() => router.push({ pathname: '/product-details', params: { id: item.id } })}
            />
          ))}
        </View>
      </ContentSheet>
    </View>
  );
}
