"use client";

import { useRef, useState, useEffect, useId } from "react";

export interface DropdownOption<T extends string = string> {
  value: T;
  label: string;
  icon?: React.ReactNode;
}

interface Props<T extends string> {
  options: readonly DropdownOption<T>[];
  value: T;
  onChange: (value: T) => void;
  /** Overrides the trigger aria-label (e.g. "Theme: Light") */
  triggerLabel?: string;
  align?: "left" | "right";
}

export default function Dropdown<T extends string>({
  options,
  value,
  onChange,
  triggerLabel,
  align = "right",
}: Props<T>) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  const current = options.find((o) => o.value === value) ?? options[0];

  function close() {
    setOpen(false);
    buttonRef.current?.focus();
  }

  useEffect(() => {
    function onOutsideClick(e: PointerEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (open && e.key === "Escape") close();
    }
    document.addEventListener("pointerdown", onOutsideClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onOutsideClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      menuRef.current?.querySelector<HTMLElement>("[role='menuitem']")?.focus();
    }
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        ref={buttonRef}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={triggerLabel ?? current.label}
        className="flex items-center gap-1.5 rounded-full border border-default px-3 py-1.5 text-xs text-muted transition-colors hover:text-body focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
      >
        {current.icon}
        <span aria-hidden={!!current.icon}>{current.label}</span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          className={`transition-transform duration-150 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div
          id={menuId}
          ref={menuRef}
          role="menu"
          className={`absolute top-full z-50 mt-1.5 min-w-[9rem] overflow-hidden rounded-lg border border-default bg-surface shadow-lg ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              role="menuitem"
              onClick={() => { onChange(opt.value); close(); }}
              className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-sm transition-colors hover:bg-[var(--color-border)]/20 focus:bg-[var(--color-border)]/30 focus:outline-none ${
                value === opt.value ? "font-medium text-body" : "text-muted"
              }`}
            >
              {opt.icon}
              {opt.label}
              {value === opt.value && (
                <svg
                  className="ml-auto"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
