import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { Loader2 } from "lucide-react";

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap",
    "rounded-[calc(var(--radius)*0.75)] text-sm font-medium transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--color-brand))] focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "ring-offset-[rgb(var(--color-background))]",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-[rgb(var(--color-brand))] text-white hover:bg-[rgb(var(--color-brand-strong))]",
        brand:
          "bg-[rgb(var(--color-brand))] text-white hover:bg-[rgb(var(--color-brand-strong))]",
        secondary:
          "bg-[rgb(var(--color-panel))] text-[rgb(var(--color-foreground))] border border-[rgb(var(--color-border))] hover:bg-[rgb(var(--color-muted))]",
        gold:
          "bg-[rgb(var(--color-gold))] text-white hover:bg-[rgb(var(--color-brand-strong))]",
        outline:
          "border border-[rgb(var(--color-border))] bg-transparent text-[rgb(var(--color-foreground))] hover:bg-[rgb(var(--color-panel))]",
        ghost:
          "bg-transparent text-[rgb(var(--color-foreground))] hover:bg-[rgb(var(--color-panel))]",
        link:
          "bg-transparent underline underline-offset-4 text-[rgb(var(--color-brand))] hover:opacity-90",
        destructive: "bg-red-600 text-white hover:bg-red-700",
      },
      size: {
        sm: "h-9 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-11 px-6 text-sm",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

/**
 * Rules:
 * - When `asChild` is true, Button renders a Radix <Slot> and MUST pass exactly one element child.
 *   We intentionally DO NOT render icons/spinner/wrappers in `asChild` mode to satisfy this.
 * - When `asChild` is false, we render a native <button> and may include icons/spinner.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild,
      isLoading,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const classes = twMerge(buttonVariants({ variant, size }), className);

    if (asChild) {
      // Ensure a single valid React element child
      const onlyChild = React.Children.only(children) as React.ReactElement;

      // In asChild mode, we cannot inject icons/spinner (would create multiple children).
      // Apply classes/props to the single child via Slot.
      return (
        <Slot
          className={classes}
          // aria-busy is the only "loading" hint we can add without extra nodes
          aria-busy={isLoading ? true : undefined}
        >
          {onlyChild}
        </Slot>
      );
    }

    // Normal button mode – icons/spinner allowed
    const isDisabled = disabled || isLoading;

    return (
      <button ref={ref} className={classes} disabled={isDisabled} {...props}>
        {isLoading ? (
          <Loader2
            className={twMerge(
              "mr-2 h-4 w-4 animate-spin",
              size === "lg" && "h-5 w-5",
              size === "sm" && "h-3.5 w-3.5",
              size === "icon" && "mr-0"
            )}
            aria-hidden="true"
          />
        ) : leftIcon ? (
          <span
            className={twMerge(
              "mr-2 inline-flex",
              size === "lg" ? "h-5 w-5" : "h-4 w-4",
              size === "icon" && "mr-0"
            )}
          >
            {leftIcon}
          </span>
        ) : null}

        {/* Label */}
        <span className="inline-flex items-center">{children}</span>

        {rightIcon ? (
          <span
            className={twMerge(
              "ml-2 inline-flex",
              size === "lg" ? "h-5 w-5" : "h-4 w-4",
              size === "icon" && "ml-0"
            )}
          >
            {rightIcon}
          </span>
        ) : null}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;