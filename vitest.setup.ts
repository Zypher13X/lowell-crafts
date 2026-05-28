import "@testing-library/jest-dom";
import { vi, beforeEach } from "vitest";
import React from "react";

// ── Next.js mocks ──────────────────────────────────────────────────
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
  notFound: () => { throw new Error("notFound"); },
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...rest }: { children: React.ReactNode; href: string; [k: string]: unknown }) =>
    React.createElement("a", { href, ...rest }, children),
}));

vi.mock("next/image", () => ({
  default: ({ src, alt, ...rest }: { src: string; alt: string; [k: string]: unknown }) =>
    React.createElement("img", { src, alt, ...rest }),
}));

// next/dynamic: render the component synchronously (no lazy loading in tests)
vi.mock("next/dynamic", () => ({
  default: (loader: () => Promise<{ default: React.ComponentType }>) => {
    let Component: React.ComponentType | null = null;
    loader().then((m) => { Component = m.default; });
    return function DynamicComponent(props: Record<string, unknown>) {
      if (!Component) return null;
      return React.createElement(Component, props);
    };
  },
}));

// ── localStorage ───────────────────────────────────────────────────
beforeEach(() => {
  localStorage.clear();
});
