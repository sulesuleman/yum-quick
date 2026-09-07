import { useEffect, useState } from 'react';
import { ScrollView, Text, useWindowDimensions, View } from 'react-native';
import { router } from 'expo-router';

import { BestSellerCard } from '@components/Cards/BestSellerCard';
import { resolveCategoryIcon } from '@/src/constants/categories';
import { resolveProductImage } from '@/src/constants/productImages';
import { useCart } from '@features/cart/CartContext';
import { useFavorites } from '@features/favorites/useFavorites';
import { categoriesApi } from '@services/categoriesApi';
import { productsApi } from '@services/productsApi';
import { Category, Product } from '@services/types';

import { useFavoritesScreenStyles } from './useFavoritesScreenStyles';

const GRID_GAP = 7;
const SCREEN_MARGIN = 24;

export function FavoritesScreen() {
  const styles = useFavoritesScreenStyles();
  const { width: windowWidth } = useWindowDimensions();
  const { favorites, isFavorite, toggle } = useFavorites();
  const { addItem } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    productsApi.list().then(setProducts);
    categoriesApi.list().then(setCategories);
  }, []);

  const iconByCategory = new Map(categories.map((cat) => [cat.id, resolveCategoryIcon(cat.icon)]));
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
              categoryIcon={iconByCategory.get(item.category)}
              image={resolveProductImage(item.imageKey)}
              width={cardWidth}
              isFavorite={isFavorite(item.id)}
              onToggleFavorite={() => toggle(item.id)}
              onAddToCart={() => addItem(item, 1, [])}
              onPress={() => router.push({ pathname: '/product-details', params: { id: item.id } })}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
