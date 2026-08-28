import { apiClient } from './apiClient';
import { PaymentMethod } from './types';

export const paymentMethodsApi = {
  listForUser: (userId: string) =>
    apiClient.get<PaymentMethod[]>(`/paymentMethods?userId=${userId}`),
  create: (method: Omit<PaymentMethod, 'id'>) =>
    apiClient.post<PaymentMethod>('/paymentMethods', method)
};
