import * as React from 'react';
import clsx from 'clsx';

/** DaisyUI status/type shim (used where you imported from '@/components/ui/daisy') */
export type Status = 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'neutral';
type Size = 'xs' | 'sm' | 'md' | 'lg';

const colorToBtn = (c?: Status) =>
  c ? `btn-${c === 'neutral' ? 'neutral' : c}` : 'btn-primary';
const sizeToBtn = (s?: Size) => (s ? `btn-${s}` : '');

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: Status;
  size?: Size;
  variant?: 'outline' | 'ghost' | 'link' | 'soft';
  loading?: boolean;
}
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, color, size, variant, loading, children, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'btn',
          colorToBtn(color),
          sizeToBtn(size),
          variant === 'outline' && 'btn-outline',
          variant === 'ghost' && 'btn-ghost',
          variant === 'link' && 'btn-link',
          variant === 'soft' && 'btn-soft',
          loading && 'loading',
          className
        )}
        {...rest}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  bordered?: boolean;
  color?: Status;
  size?: Size;
}
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, bordered = true, size, color, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        className={clsx(
          'input',
          bordered && 'input-bordered',
          size && `input-${size}`,
          color && `input-${color}`,
          'w-full',
          className
        )}
        {...rest}
      />
    );
  }
);
Input.displayName = 'Input';

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  as?: keyof JSX.IntrinsicElements;
  bodyClassName?: string;
}
export function Card({ as = 'article', className, bodyClassName, children, ...rest }: CardProps) {
  const Comp: any = as;
  return (
    <Comp className={clsx('card bg-base-100 shadow', className)} {...rest}>
      <div className={clsx('card-body', bodyClassName)}>{children}</div>
    </Comp>
  );
}

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: Status;
  size?: Size;
  variant?: 'outline' | 'ghost' | 'soft';
}
export function Badge({ className, color, size, variant, ...rest }: BadgeProps) {
  return (
    <span
      className={clsx(
        'badge',
        color && `badge-${color}`,
        size && `badge-${size}`,
        variant === 'outline' && 'badge-outline',
        variant === 'ghost' && 'badge-ghost',
        variant === 'soft' && 'badge-soft',
        className
      )}
      {...rest}
    />
  );
}

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: Extract<Status, 'info' | 'success' | 'warning' | 'error'>;
}
export function Alert({ className, status, children, ...rest }: AlertProps) {
  return (
    <div className={clsx('alert', status && `alert-${status}`, className)} role="alert" {...rest}>
      {children}
    </div>
  );
}

type ModalBaseProps = React.HTMLAttributes<HTMLDialogElement> & { open?: boolean; onClose?(): void };
export function Modal({ open, onClose, className, children, ...rest }: ModalBaseProps) {
  return (
    <dialog open={open} className={clsx('modal', className)} onClose={onClose} {...rest}>
      <div className="modal-box">{children}</div>
      <form method="dialog" className="modal-backdrop">
        <button aria-label="Close" onClick={onClose}>close</button>
      </form>
    </dialog>
  );
}

export function Checkbox(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input type="checkbox" className={clsx('checkbox', props.className)} {...props} />;
}