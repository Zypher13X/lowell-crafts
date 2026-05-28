"use client";

import { createContext, useContext, useState, useLayoutEffect } from "react";

export type Theme = "light" | "dark" | "craft";

const VALID: Theme[] = ["light", "dark", "craft"];

function readTheme(): Theme {
  // Reads the data-theme attribute already set by the anti-flash script,
  // so the initial state always matches the DOM — no toggle flicker.
  if (typeof window === "undefined") return "light";
  const attr = document.documentElement.getAttribute("data-theme") as Theme;
  return VALID.includes(attr) ? attr : "light";
}

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (t: Theme) => void;
}>({ theme: "light", setTheme: () => {} });

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(readTheme);

  // Re-apply after hydration in case Next.js reconciled data-theme back to
  // the server-rendered default. useLayoutEffect runs before the browser paints
  // so there is no visible flash.
  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function setTheme(t: Theme) {
    document.documentElement.classList.add("theme-transitioning");
    setThemeState(t);
    document.documentElement.setAttribute("data-theme", t);
    try {
      localStorage.setItem("theme", t);
    } catch {
      // localStorage unavailable in private browsing — visual change still applied
    }
    setTimeout(() => document.documentElement.classList.remove("theme-transitioning"), 300);
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
