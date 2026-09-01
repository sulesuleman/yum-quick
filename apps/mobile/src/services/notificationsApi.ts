import { apiClient } from './apiClient';
import { Notification } from './types';

export const notificationsApi = {
  listForUser: (userId: string) =>
    apiClient.get<Notification[]>(`/notifications?userId=${userId}&_sort=createdAt&_order=desc`),
  markRead: (id: string) => apiClient.patch<Notification>(`/notifications/${id}`, { read: true })
};
