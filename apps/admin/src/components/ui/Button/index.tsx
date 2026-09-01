import type { ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'cta' | 'ghost' | 'danger';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  fullWidth?: boolean;
};

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-yellow-base text-brand hover:bg-yellow-2',
  cta: 'bg-orange-base text-text-inverse hover:opacity-90',
  ghost: 'border border-divider bg-transparent text-text hover:bg-orange-2',
  danger: 'bg-danger text-text-inverse hover:opacity-90'
};

export function Button({ variant = 'primary', fullWidth, className, ...props }: ButtonProps) {
  const classes = [
    'inline-flex min-h-10 items-center justify-center gap-2 rounded-full px-8 py-2.5 font-medium text-[15px] transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50',
    VARIANT_CLASSES[variant],
    fullWidth && 'w-full',
    className
  ]
    .filter(Boolean)
    .join(' ');

  return <button type='button' className={classes} {...props} />;
}
