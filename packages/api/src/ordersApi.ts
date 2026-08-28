import { apiClient } from './apiClient';
import { Order, OrderStatus } from './types';

export const ordersApi = {
  listForUser: (userId: string) =>
    apiClient.get<Order[]>(`/orders?userId=${userId}&_sort=placedAt&_order=desc`),
  listAll: () => apiClient.get<Order[]>('/orders?_sort=placedAt&_order=desc'),
  create: (order: Omit<Order, 'id'>) => apiClient.post<Order>('/orders', order),
  updateStatus: (id: string, status: OrderStatus, cancelReason?: string) =>
    apiClient.patch<Order>(`/orders/${id}`, { status, ...(cancelReason ? { cancelReason } : {}) })
};
