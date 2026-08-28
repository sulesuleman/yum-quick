import BannerPizza from '@/assets/banner-pizza.svg';

const BANNER_ICONS: Record<string, typeof BannerPizza> = {
  pizza: BannerPizza
};

export function resolveBannerIcon(bannerKey: string) {
  return BANNER_ICONS[bannerKey] ?? BannerPizza;
}
