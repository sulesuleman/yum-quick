import { apiClient } from './apiClient';
import { Category } from './types';

export const categoriesApi = {
  list: () => apiClient.get<Category[]>('/categories'),
  get: (id: string) => apiClient.get<Category>(`/categories/${id}`),
  create: (category: Omit<Category, 'id'>) => apiClient.post<Category>('/categories', category),
  update: (id: string, patch: Partial<Omit<Category, 'id'>>) =>
    apiClient.patch<Category>(`/categories/${id}`, patch),
  delete: (id: string) => apiClient.delete<void>(`/categories/${id}`)
};
