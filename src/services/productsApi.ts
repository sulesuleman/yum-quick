import { apiClient } from './apiClient';
import { Product } from './types';

export const productsApi = {
  list: () => apiClient.get<Product[]>('/products'),
  get: (id: string) => apiClient.get<Product>(`/products/${id}`)
};
