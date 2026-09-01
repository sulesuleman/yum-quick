import { apiClient } from './apiClient';
import { Product } from './types';

export const productsApi = {
  list: () => apiClient.get<Product[]>('/products'),
  get: (id: string) => apiClient.get<Product>(`/products/${id}`),
  create: (product: Omit<Product, 'id'>) => apiClient.post<Product>('/products', product),
  update: (id: string, patch: Partial<Omit<Product, 'id'>>) =>
    apiClient.patch<Product>(`/products/${id}`, patch),
  delete: (id: string) => apiClient.delete<void>(`/products/${id}`)
};
