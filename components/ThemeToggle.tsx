"use client";

import { useRef, useState, useEffect } from "react";
import { useTheme, type Theme } from "./ThemeProvider";

function SunIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4"/>
      <line x1="12" y1="2" x2="12" y2="4"/>
      <line x1="12" y1="20" x2="12" y2="22"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="2" y1="12" x2="4" y2="12"/>
      <line x1="20" y1="12" x2="22" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

function YarnIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M2.5 8.5 C7 6 17 6 21.5 8.5"/>
      <path d="M2.5 15.5 C7 18 17 18 21.5 15.5"/>
      <path d="M8.5 2.5 C6 7 6 17 8.5 21.5"/>
      <path d="M15.5 2.5 C18 7 18 17 15.5 21.5"/>
    </svg>
  );
}

const OPTIONS: { value: Theme; label: string; icon: React.ReactNode }[] = [
  { value: "light", label: "Light", icon: <SunIcon /> },
  { value: "dark",  label: "Dark",  icon: <MoonIcon /> },
  { value: "craft", label: "Craft", icon: <YarnIcon /> },
];

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = OPTIONS.find((o) => o.value === theme) ?? OPTIONS[0];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-full border border-default px-3 py-1.5 text-xs text-muted transition-colors hover:text-body"
      >
        {current.icon}
        <span>{current.label}</span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={`transition-transform duration-150 ${open ? "rotate-180" : ""}`}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-36 overflow-hidden rounded-lg border border-default bg-surface shadow-lg">
          {OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => { setTheme(opt.value); setOpen(false); }}
              className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-sm transition-colors hover:bg-[var(--color-border)]/20 ${
                theme === opt.value ? "text-body font-medium" : "text-muted"
              }`}
            >
              {opt.icon}
              {opt.label}
              {theme === opt.value && (
                <svg className="ml-auto" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
