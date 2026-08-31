import type { InputHTMLAttributes } from 'react';

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function Checkbox({ label, id, className, ...inputProps }: CheckboxProps) {
  const inputId = id ?? `checkbox-${label.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <label
      htmlFor={inputId}
      className='inline-flex cursor-pointer items-center gap-2 text-sm text-text select-none'
    >
      <span className='relative flex h-5 w-5 shrink-0 items-center justify-center'>
        <input
          id={inputId}
          type='checkbox'
          className={[
            'peer h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-[6px] border-2 border-divider bg-card transition-colors checked:border-brand checked:bg-brand focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-1',
            className
          ]
            .filter(Boolean)
            .join(' ')}
          {...inputProps}
        />
        <svg
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth={3}
          strokeLinecap='round'
          strokeLinejoin='round'
          className='pointer-events-none absolute h-3 w-3 text-text-inverse opacity-0 transition-opacity peer-checked:opacity-100'
        >
          <path d='M5 13l4 4L19 7' />
        </svg>
      </span>
      {label}
    </label>
  );
}
