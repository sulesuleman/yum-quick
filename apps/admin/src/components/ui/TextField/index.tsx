import type { InputHTMLAttributes, ReactNode } from 'react';

export type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  icon?: ReactNode;
  containerClassName?: string;
};

export function TextField({
  label,
  icon,
  containerClassName,
  className,
  ...inputProps
}: TextFieldProps) {
  return (
    <div className={['flex flex-col gap-1', containerClassName].filter(Boolean).join(' ')}>
      {label ? <label className='text-sm font-medium text-text'>{label}</label> : null}
      <div className='flex h-[42px] items-center gap-2 rounded-[13px] bg-yellow-2 px-4'>
        {icon ? <span className='flex items-center text-muted'>{icon}</span> : null}
        <input
          className={[
            'h-full flex-1 border-none bg-transparent text-sm text-text outline-none placeholder:text-muted',
            className
          ]
            .filter(Boolean)
            .join(' ')}
          {...inputProps}
        />
      </div>
    </div>
  );
}
