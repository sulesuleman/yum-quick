import { useEffect, useState } from 'react';
import { ScrollView, Text, useWindowDimensions, View } from 'react-native';
import { router } from 'expo-router';

import { BestSellerCard } from '@components/Cards/BestSellerCard';
import { resolveProductImage } from '@/src/constants/productImages';
import { useFavorites } from '@features/favorites/useFavorites';
import { productsApi } from '@services/productsApi';
import { Product } from '@services/types';

import { useFavoritesScreenStyles } from './useFavoritesScreenStyles';

const GRID_GAP = 7;
const SCREEN_MARGIN = 24;

export function FavoritesScreen() {
  const styles = useFavoritesScreenStyles();
  const { width: windowWidth } = useWindowDimensions();
  const { favorites, isFavorite, toggle } = useFavorites();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    productsApi.list().then(setProducts);
  }, []);

  const favoriteProducts = products.filter((p) => favorites.some((f) => f.productId === p.id));
  const cardWidth = (windowWidth - SCREEN_MARGIN * 2 - GRID_GAP) / 2;

  if (favoriteProducts.length === 0) {
    return (
      <View style={styles.emptyScreen}>
        <Text style={styles.title}>No favorites yet</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {favoriteProducts.map((item) => (
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
      </ScrollView>
    </View>
  );
}
