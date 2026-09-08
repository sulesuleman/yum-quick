import { apiClient } from './apiClient';
import { Category } from './types';

export const categoriesApi = {
  list: () => apiClient.get<Category[]>('/categories')
};
