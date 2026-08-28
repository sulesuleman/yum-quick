import { apiClient } from './apiClient';
import { User } from './types';

export const usersApi = {
  findByEmail: async (email: string): Promise<User | null> => {
    const users = await apiClient.get<User[]>(`/users?email=${encodeURIComponent(email)}`);
    return users[0] ?? null;
  },
  get: (id: string) => apiClient.get<User>(`/users/${id}`),
  create: (user: Omit<User, 'id'>) => apiClient.post<User>('/users', user),
  update: (id: string, patch: Partial<Omit<User, 'id'>>) =>
    apiClient.patch<User>(`/users/${id}`, patch)
};
