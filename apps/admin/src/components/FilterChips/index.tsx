export type FilterChipsProps<T extends string> = {
  options: readonly { label: string; value: T }[];
  value: T;
  onChange: (value: T) => void;
};

export function FilterChips<T extends string>({ options, value, onChange }: FilterChipsProps<T>) {
  return (
    <div className='flex gap-1.5 overflow-x-auto pb-0.5'>
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type='button'
            onClick={() => onChange(option.value)}
            className={`shrink-0 rounded-full border px-4 py-1.5 text-[13px] font-medium transition-colors ${
              selected
                ? 'border-brand bg-brand text-text-inverse'
                : 'border-divider bg-card text-muted hover:border-brand/50 hover:bg-orange-2'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
