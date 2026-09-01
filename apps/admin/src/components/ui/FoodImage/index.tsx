export { resolveProductImage } from './productImages';

export type FoodImageProps = {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  borderRadius?: number;
  showPrice?: boolean;
  price?: number;
};

export function FoodImage({
  src,
  alt = '',
  width = 72,
  height = 72,
  borderRadius = 16,
  showPrice = false,
  price
}: FoodImageProps) {
  return (
    <div className='relative shrink-0 overflow-hidden' style={{ width, height, borderRadius }}>
      {src ? <img src={src} alt={alt} className='block h-full w-full object-cover' /> : null}
      {showPrice && price !== undefined && (
        <div className='absolute right-0 bottom-2 flex h-[18px] items-center rounded-l-full bg-orange-base py-0 pr-1.5 pl-2'>
          <span className='text-[11px] font-medium whitespace-nowrap text-text-inverse'>
            ${price.toFixed(2)}
          </span>
        </div>
      )}
    </div>
  );
}
