export type SpinnerProps = {
  size?: number;
};

export function Spinner({ size = 24 }: SpinnerProps) {
  return (
    <div
      className='animate-spin rounded-full border-[3px] border-orange-2 border-t-brand'
      style={{ width: size, height: size }}
      role='status'
      aria-label='Loading'
    />
  );
}

export function PageLoader() {
  return (
    <div className='flex flex-1 items-center justify-center py-24'>
      <Spinner size={32} />
    </div>
  );
}
