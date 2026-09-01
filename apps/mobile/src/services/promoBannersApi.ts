import { apiClient } from './apiClient';
import { PromoBanner } from './types';

export const promoBannersApi = {
  list: () => apiClient.get<PromoBanner[]>('/promoBanners')
};
