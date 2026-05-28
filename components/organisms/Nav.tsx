"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/molecules/ThemeToggle";

const NAV_LINKS = [
  { href: "/", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-default bg-page">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-serif text-xl tracking-wide text-body">
          Lowell Crafts
        </Link>
        <div className="flex items-center gap-6">
          <nav aria-label="Main navigation" className="flex gap-6 text-sm text-muted">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={`transition-colors hover:text-body ${isActive ? "text-body font-medium" : ""}`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
