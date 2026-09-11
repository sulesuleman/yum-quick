import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { useAuth } from '@features/auth/AuthContext';
import { favoritesApi } from '@services/favoritesApi';
import { Favorite } from '@services/types';

export function useFavorites() {
  const { userId } = useAuth();
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  // Tab screens stay mounted across navigation, so a plain mount-time fetch would go stale the
  // moment a favorite is toggled from a different screen (e.g. Product Details). Refetching on
  // focus keeps every screen's copy in sync with whatever last changed it.
  useFocusEffect(
    useCallback(() => {
      if (!userId) return;
      favoritesApi.listForUser(userId).then(setFavorites);
    }, [userId])
  );

  const isFavorite = useCallback(
    (productId: string) => favorites.some((f) => f.productId === productId),
    [favorites]
  );

  const toggle = useCallback(
    async (productId: string) => {
      if (!userId) return;
      const existing = favorites.find((f) => f.productId === productId);
      if (existing) {
        setFavorites((prev) => prev.filter((f) => f.id !== existing.id));
        await favoritesApi.remove(existing.id);
      } else {
        const created = await favoritesApi.create({ userId, productId });
        setFavorites((prev) => [...prev, created]);
      }
    },
    [favorites, userId]
  );

  return { favorites, isFavorite, toggle };
}
