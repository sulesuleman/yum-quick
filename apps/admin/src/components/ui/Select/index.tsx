import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { ChevronDownIcon } from '../../icons';

export type SelectOption<T extends string> = { label: string; value: T };

export type SelectProps<T extends string> = {
  label?: string;
  value: T;
  onChange: (value: T) => void;
  options: readonly SelectOption<T>[];
  containerClassName?: string;
};

export function Select<T extends string>({
  label,
  value,
  onChange,
  options,
  containerClassName
}: SelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // The options panel is portaled to <body> and positioned with `fixed` coordinates instead of
  // being an absolutely-positioned child of this component, so it never adds to the scrollable
  // content area of an ancestor (e.g. the modal's own scroll container) — only the panel itself
  // scrolls when its content overflows.
  useLayoutEffect(() => {
    if (!isOpen || !buttonRef.current) return;

    const updatePosition = () => {
      const rect = buttonRef.current!.getBoundingClientRect();
      setPosition({ top: rect.bottom + 4, left: rect.left, width: rect.width });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    document.addEventListener('scroll', updatePosition, true);
    return () => {
      window.removeEventListener('resize', updatePosition);
      document.removeEventListener('scroll', updatePosition, true);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (buttonRef.current?.contains(target) || listRef.current?.contains(target)) return;
      setIsOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  const selected = options.find((option) => option.value === value);

  return (
    <div className={['flex flex-col gap-1', containerClassName].filter(Boolean).join(' ')}>
      {label ? <label className='text-sm font-medium text-text'>{label}</label> : null}

      <button
        ref={buttonRef}
        type='button'
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup='listbox'
        aria-expanded={isOpen}
        className='flex h-[42px] items-center justify-between rounded-[13px] bg-yellow-2 px-4 text-left text-sm text-text capitalize outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand/40'
      >
        <span className='truncate'>{selected?.label ?? ''}</span>
        <ChevronDownIcon
          size={16}
          className={`shrink-0 text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen
        ? createPortal(
            <ul
              ref={listRef}
              role='listbox'
              style={{ top: position.top, left: position.left, width: position.width }}
              className='scroll-area fixed z-[60] max-h-52 overflow-y-auto rounded-[13px] border border-divider bg-card p-1.5 shadow-[0_10px_24px_-8px_rgba(57,23,19,0.25)]'
            >
              {options.map((option) => {
                const isSelected = option.value === value;
                return (
                  <li
                    key={option.value}
                    role='option'
                    aria-selected={isSelected}
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className={`cursor-pointer rounded-[10px] px-3 py-2 text-sm capitalize transition-colors ${
                      isSelected ? 'bg-brand text-text-inverse' : 'text-text hover:bg-orange-2'
                    }`}
                  >
                    {option.label}
                  </li>
                );
              })}
            </ul>,
            document.body
          )
        : null}
    </div>
  );
}
