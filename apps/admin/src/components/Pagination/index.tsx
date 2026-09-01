import { ChevronRightIcon } from '../icons';

export type PaginationProps = {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
};

function getPageNumbers(page: number, pageCount: number): (number | 'ellipsis')[] {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  const pages = new Set<number>([1, pageCount, page, page - 1, page + 1]);
  const sorted = Array.from(pages)
    .filter((p) => p >= 1 && p <= pageCount)
    .sort((a, b) => a - b);

  const result: (number | 'ellipsis')[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) result.push('ellipsis');
    result.push(p);
  });
  return result;
}

export function Pagination({ page, pageCount, onPageChange }: PaginationProps) {
  if (pageCount <= 1) return null;

  return (
    <div className='flex items-center justify-between gap-3 border-t border-divider px-4 py-3'>
      <button
        type='button'
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className='flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-orange-2 hover:text-brand disabled:pointer-events-none disabled:opacity-30'
        aria-label='Previous page'
      >
        <ChevronRightIcon size={16} className='rotate-180' />
      </button>

      <div className='flex items-center gap-1'>
        {getPageNumbers(page, pageCount).map((p, i) =>
          p === 'ellipsis' ? (
            <span key={`e-${i}`} className='px-1.5 text-sm text-muted'>
              …
            </span>
          ) : (
            <button
              key={p}
              type='button'
              onClick={() => onPageChange(p)}
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                p === page ? 'bg-brand text-text-inverse' : 'text-text hover:bg-orange-2'
              }`}
            >
              {p}
            </button>
          )
        )}
      </div>

      <button
        type='button'
        onClick={() => onPageChange(page + 1)}
        disabled={page >= pageCount}
        className='flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-orange-2 hover:text-brand disabled:pointer-events-none disabled:opacity-30'
        aria-label='Next page'
      >
        <ChevronRightIcon size={16} />
      </button>
    </div>
  );
}
