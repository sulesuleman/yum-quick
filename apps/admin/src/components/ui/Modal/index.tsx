import type { PropsWithChildren } from 'react';

import { CloseIcon } from '../../icons';

export type ModalProps = PropsWithChildren<{
  title: string;
  onClose: () => void;
}>;

export function Modal({ title, onClose, children }: ModalProps) {
  return (
    <div
      className='fixed inset-0 z-50 flex items-end justify-center bg-black/40 md:items-center md:p-4'
      onClick={onClose}
    >
      <div
        className='modal-panel scroll-area max-h-[85vh] w-full overflow-y-auto rounded-t-3xl bg-card p-6 shadow-2xl md:max-h-[90vh] md:max-w-md md:rounded-3xl'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-lg font-bold text-text'>{title}</h2>
          <button
            type='button'
            onClick={onClose}
            className='flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-orange-2 hover:text-brand active:scale-95'
            aria-label='Close'
          >
            <CloseIcon size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
