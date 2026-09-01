import { apiClient } from './apiClient';
import { Admin } from './types';

export const adminsApi = {
  list: () => apiClient.get<Admin[]>('/admins'),
  findByEmail: async (email: string): Promise<Admin | null> => {
    const admins = await apiClient.get<Admin[]>(`/admins?email=${encodeURIComponent(email)}`);
    return admins[0] ?? null;
  },
  create: (admin: Omit<Admin, 'id'>) => apiClient.post<Admin>('/admins', admin),
  update: (id: string, patch: Partial<Omit<Admin, 'id'>>) =>
    apiClient.patch<Admin>(`/admins/${id}`, patch),
  delete: (id: string) => apiClient.delete<void>(`/admins/${id}`)
};
