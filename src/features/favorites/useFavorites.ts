import { useCallback, useEffect, useState } from 'react';

import { useAuth } from '@features/auth/AuthContext';
import { favoritesApi } from '@services/favoritesApi';
import { Favorite } from '@services/types';

export function useFavorites() {
  const { userId } = useAuth();
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    if (!userId) return;
    favoritesApi.listForUser(userId).then(setFavorites);
  }, [userId]);

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
