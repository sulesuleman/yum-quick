import { apiClient } from './apiClient';
import { Address } from './types';

export const addressesApi = {
  listForUser: (userId: string) => apiClient.get<Address[]>(`/addresses?userId=${userId}`),
  create: (address: Omit<Address, 'id'>) => apiClient.post<Address>('/addresses', address),
  setDefault: (id: string) => apiClient.patch<Address>(`/addresses/${id}`, { isDefault: true }),
  clearDefault: (id: string) => apiClient.patch<Address>(`/addresses/${id}`, { isDefault: false })
};
