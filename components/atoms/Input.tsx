import type { InputHTMLAttributes } from "react";

export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="mt-1 w-full rounded-md border border-default bg-surface px-4 py-2.5 text-body placeholder-[var(--color-subtle)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
      {...props}
    />
  );
}
