import styles from "styles/sdk-override.module.css";

// Reusable utility snippets driven by tokens
const ringFocus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))]";

export const BOXYHQ_UI_CSS = {
  button: {
    // Primary call-to-action
    ctoa:
      `inline-flex h-10 items-center justify-center rounded-[calc(var(--radius)*0.75)] ` +
      `bg-[rgb(var(--color-brand))] px-4 text-sm font-medium text-white transition-opacity hover:opacity-95 ` +
      `disabled:pointer-events-none disabled:opacity-50 ${ringFocus}`,
    // Destructive (error)
    destructive:
      `inline-flex h-10 items-center justify-center rounded-[calc(var(--radius)*0.75)] ` +
      `bg-red-600 px-4 text-sm font-medium text-white hover:bg-red-700 transition-colors ` +
      `disabled:pointer-events-none disabled:opacity-50 ${ringFocus}`,
    // Neutral/secondary (no explicit border)
    cancel:
      `inline-flex h-10 items-center justify-center rounded-[calc(var(--radius)*0.75)] ` +
      `px-4 text-sm font-medium text-[rgb(var(--color-foreground))] hover:bg-[rgb(var(--color-muted))] ` +
      `border border-[rgb(var(--color-border))] bg-transparent ${ringFocus}`,
  },

  // Inputs/selects/textarea — match our <Input /> primitive styles
  input:
    `${styles["sdk-input"]} ` +
    `h-10 w-full rounded-[calc(var(--radius)*0.75)] border border-[rgb(var(--color-border))] ` +
    `bg-white px-3 py-2 text-sm text-[rgb(var(--color-foreground))] shadow-sm outline-none placeholder:text-slate-400 ` +
    `dark:bg-[rgb(var(--color-muted))] ${ringFocus}`,

  select: styles["sdk-select"],

  textarea:
    `${styles["sdk-input"]} ` +
    `w-full rounded-[calc(var(--radius)*0.75)] border border-[rgb(var(--color-border))] ` +
    `bg-white px-3 py-2 text-sm text-[rgb(var(--color-foreground))] shadow-sm outline-none ` +
    `dark:bg-[rgb(var(--color-muted))] ${ringFocus}`,

  confirmationPrompt: {
    button: {
      ctoa:
        `inline-flex h-10 items-center justify-center rounded-[calc(var(--radius)*0.75)] ` +
        `px-4 text-sm font-medium text-[rgb(var(--color-foreground))] hover:bg-[rgb(var(--color-muted))] ` +
        `border border-[rgb(var(--color-border))] bg-transparent ${ringFocus}`,
      cancel:
        `inline-flex h-10 items-center justify-center rounded-[calc(var(--radius)*0.75)] ` +
        `px-4 text-sm font-medium text-[rgb(var(--color-foreground))] hover:bg-[rgb(var(--color-muted))] ` +
        `border border-[rgb(var(--color-border))] bg-transparent ${ringFocus}`,
    },
  },

  // used in secret fields
  secretInput:
    `h-10 w-full rounded-[calc(var(--radius)*0.75)] border border-[rgb(var(--color-border))] ` +
    `bg-white px-3 py-2 text-sm text-[rgb(var(--color-foreground))] shadow-sm outline-none placeholder:text-slate-400 ` +
    `dark:bg-[rgb(var(--color-muted))] ${ringFocus}`,

  section: "mb-8",
};