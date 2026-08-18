import React from 'react';
import { Text, useWindowDimensions, View } from 'react-native';
import { Stack, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BackArrowIcon from '@/assets/back-arrow.svg';

import { ContentSheet } from '@components/ContentSheet';
import { IconButton } from '@components/ui/button/IconButton';
import { BestSellerCard } from '@components/Cards/BestSellerCard';
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

const BEST_SELLERS = [
  {
    id: '1',
    name: 'Sunny Bruschetta',
    description: 'Toasted baguette topped with tomatoes, basil and olive oil',
    price: 8.5,
    rating: 4.5,
    category: 'snacks' as const,
    image: require('@/assets/mexican-appetizer.png')
  },
  {
    id: '2',
    name: 'Gourmet Grilled Skewers',
    description: 'Char-grilled skewers marinated in herbs and spices',
    price: 14.0,
    rating: 4.8,
    category: 'meal' as const,
    image: require('@/assets/mexican-appetizer.png')
  },
  {
    id: '3',
    name: 'Barbecue Tacos',
    description: 'Smoky barbecue filling wrapped in a soft corn tortilla',
    price: 11.25,
    rating: 4.2,
    category: 'meal' as const,
    image: require('@/assets/mexican-appetizer.png')
  },
  {
    id: '4',
    name: 'Broccoli Lasagna',
    description: 'Layers of pasta with creamy broccoli and cheese sauce',
    price: 13.75,
    rating: 4.0,
    category: 'vegan' as const,
    image: require('@/assets/mexican-appetizer.png')
  },
  {
    id: '5',
    name: 'Choco Lava Cake',
    description: 'Warm chocolate cake with a molten center, served with cream',
    price: 9.5,
    rating: 4.9,
    category: 'dessert' as const,
    image: require('@/assets/mexican-appetizer.png')
  },
  {
    id: '6',
    name: 'Mango Iced Tea',
    description: 'Refreshing iced tea blended with fresh mango puree',
    price: 5.0,
    rating: 3.8,
    category: 'drinks' as const,
    image: require('@/assets/mexican-appetizer.png')
  },
  {
    id: '7',
    name: 'Crispy Veggie Bites',
    description: 'Golden fried vegetable fritters with a tangy dip',
    price: 7.25,
    rating: 4.3,
    category: 'snacks' as const,
    image: require('@/assets/mexican-appetizer.png')
  },
  {
    id: '8',
    name: 'Berry Cheesecake',
    description: 'Creamy cheesecake topped with a mixed berry compote',
    price: 10.5,
    rating: 4.6,
    category: 'dessert' as const,
    image: require('@/assets/mexican-appetizer.png')
  }
];

export function BestSellerScreen() {
  const insets = useSafeAreaInsets();
  const styles = useBestSellerScreenStyles();
  const { width: windowWidth } = useWindowDimensions();

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
          {BEST_SELLERS.map((item) => (
            <BestSellerCard
              key={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              rating={item.rating}
              category={item.category}
              image={item.image}
              width={cardWidth}
              onPress={() => router.push({ pathname: '/product-details', params: { id: item.id } })}
            />
          ))}
        </View>
      </ContentSheet>
    </View>
  );
}
