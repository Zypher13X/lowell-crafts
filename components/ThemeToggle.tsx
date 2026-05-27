"use client";

import { useTheme, type Theme } from "./ThemeProvider";

const CYCLE: Theme[] = ["light", "dark", "craft"];

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
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
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

function YarnIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M2.5 8.5 C7 6 17 6 21.5 8.5"/>
      <path d="M2.5 15.5 C7 18 17 18 21.5 15.5"/>
      <path d="M8.5 2.5 C6 7 6 17 8.5 21.5"/>
      <path d="M15.5 2.5 C18 7 18 17 15.5 21.5"/>
    </svg>
  );
}

const ICONS: Record<Theme, React.ReactNode> = {
  light: <SunIcon />,
  dark: <MoonIcon />,
  craft: <YarnIcon />,
};

const LABELS: Record<Theme, string> = {
  light: "Light",
  dark: "Dark",
  craft: "Craft",
};

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  function cycle() {
    const next = CYCLE[(CYCLE.indexOf(theme) + 1) % CYCLE.length];
    setTheme(next);
  }

  return (
    <button
      onClick={cycle}
      title={`Switch theme (current: ${theme})`}
      className="flex items-center gap-1.5 rounded-full border border-default px-3 py-1.5 text-xs text-muted transition-colors hover:text-body"
    >
      {ICONS[theme]}
      <span>{LABELS[theme]}</span>
    </button>
  );
}
