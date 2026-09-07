export type ProductBadgesProps = {
  isBestSeller: boolean;
  isRecommended: boolean;
};

export function ProductBadges({ isBestSeller, isRecommended }: ProductBadgesProps) {
  if (!isBestSeller && !isRecommended) return null;

  return (
    <div className='flex flex-wrap gap-1.5'>
      {isBestSeller ? (
        <span className='inline-flex self-start rounded-full bg-orange-2 px-2 py-1 text-xs font-semibold text-brand'>
          Hot Seller
        </span>
      ) : null}
      {isRecommended ? (
        <span className='inline-flex self-start rounded-full bg-success-bg px-2 py-1 text-xs font-semibold text-success'>
          Recommended
        </span>
      ) : null}
    </div>
  );
}
