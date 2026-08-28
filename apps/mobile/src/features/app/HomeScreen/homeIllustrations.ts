import BestSeller1 from '@/assets/best-seller1.svg';
import BestSeller2 from '@/assets/best-seller-2.svg';
import BestSeller3 from '@/assets/best-seller-3.svg';
import BestSeller4 from '@/assets/best-seller-4.svg';
import Recommended1 from '@/assets/recommended-1.svg';
import Recommended2 from '@/assets/recommended-2.svg';

const BEST_SELLER_ILLUSTRATIONS = [BestSeller1, BestSeller2, BestSeller3, BestSeller4];
const RECOMMEND_ILLUSTRATIONS = [Recommended1, Recommended2];

/** Decorative illustrations for Home's Best Seller strip — real price/rating comes from the server, the SVG art is a bundled asset resolved by position since it has no server-side equivalent. */
export function getBestSellerIllustration(index: number) {
  return BEST_SELLER_ILLUSTRATIONS[index % BEST_SELLER_ILLUSTRATIONS.length];
}

/** Same idea for the Recommend grid. */
export function getRecommendIllustration(index: number) {
  return RECOMMEND_ILLUSTRATIONS[index % RECOMMEND_ILLUSTRATIONS.length];
}
