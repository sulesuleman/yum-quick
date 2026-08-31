import type { ComponentType } from 'react';

import { useCountUp } from '../../hooks/useCountUp';
import type { IconProps } from '../icons';

export type StatCardTone = 'orange' | 'success' | 'paleYellow' | 'yellow';

const TONE_CLASSES: Record<StatCardTone, string> = {
  orange: 'bg-orange-2 text-brand',
  success: 'bg-success-bg text-success',
  paleYellow: 'bg-yellow-2 text-brand',
  yellow: 'bg-yellow-base text-text'
};

export type StatCardProps = {
  label: string;
  value: number;
  formatValue?: (value: number) => string;
  icon: ComponentType<IconProps>;
  tone?: StatCardTone;
  onClick?: () => void;
};

export function StatCard({
  label,
  value,
  formatValue,
  icon: IconComponent,
  tone = 'orange',
  onClick
}: StatCardProps) {
  const animated = useCountUp(value);
  const display = formatValue ? formatValue(animated) : String(Math.round(animated));

  return (
    <button
      type='button'
      onClick={onClick}
      className='group flex flex-1 basis-[200px] flex-col gap-0.5 rounded-[18px] border border-divider bg-card p-4 text-left shadow-[0_4px_14px_-8px_rgba(57,23,19,0.15)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_22px_-10px_rgba(57,23,19,0.25)] active:translate-y-0 active:scale-[0.98]'
    >
      <div
        className={`mb-1 flex h-9 w-9 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-110 ${TONE_CLASSES[tone]}`}
      >
        <IconComponent size={20} />
      </div>
      <span className='text-[26px] font-bold text-text'>{display}</span>
      <span className='text-[13px] text-muted'>{label}</span>
    </button>
  );
}
