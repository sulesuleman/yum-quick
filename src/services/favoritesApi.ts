import { apiClient } from './apiClient';
import { Favorite } from './types';

export const favoritesApi = {
  listForUser: (userId: string) => apiClient.get<Favorite[]>(`/favorites?userId=${userId}`),
  create: (favorite: Omit<Favorite, 'id'>) => apiClient.post<Favorite>('/favorites', favorite),
  remove: (id: string) => apiClient.delete<void>(`/favorites/${id}`)
};
