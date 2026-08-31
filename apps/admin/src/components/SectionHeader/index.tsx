export type SectionHeaderProps = {
  title: string;
  actionLabel?: string;
  onActionClick?: () => void;
};

export function SectionHeader({ title, actionLabel, onActionClick }: SectionHeaderProps) {
  return (
    <div className='mb-2 flex items-center justify-between'>
      <span className='text-lg font-bold text-text'>{title}</span>
      {actionLabel ? (
        <button
          type='button'
          className='cursor-pointer border-none bg-transparent text-[13px] font-medium text-brand transition-colors hover:text-orange-dark hover:underline'
          onClick={onActionClick}
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
