import * as React from "react";
import { twMerge } from "tailwind-merge";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={twMerge(
        "flex h-10 w-full rounded-[calc(var(--radius)*0.75)] border border-[rgb(var(--color-border))] bg-white px-3 py-2 text-sm text-[rgb(var(--color-foreground))] shadow-sm outline-none placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] dark:bg-[rgb(var(--color-muted))]",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";