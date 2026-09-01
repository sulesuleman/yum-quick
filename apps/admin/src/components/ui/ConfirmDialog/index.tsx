import { Button, type ButtonVariant } from '../Button';
import { Modal } from '../Modal';

export type ConfirmDialogProps = {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: ButtonVariant;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'cta',
  isLoading,
  onConfirm,
  onCancel
}: ConfirmDialogProps) {
  return (
    <Modal title={title} onClose={onCancel}>
      <p className='text-sm text-muted'>{message}</p>
      <div className='mt-5 flex gap-3'>
        <Button variant='ghost' className='flex-1' onClick={onCancel} disabled={isLoading}>
          {cancelLabel}
        </Button>
        <Button variant={variant} className='flex-1' onClick={onConfirm} disabled={isLoading}>
          {isLoading ? 'Please wait…' : confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
