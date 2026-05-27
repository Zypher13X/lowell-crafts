import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  return (
    <header className="border-b border-default bg-page">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-serif text-xl tracking-wide text-body">
          Lowell Crafts
        </Link>
        <div className="flex items-center gap-6">
          <nav className="flex gap-6 text-sm text-muted">
            <Link href="/" className="hover:text-body transition-colors">Shop</Link>
            <Link href="/about" className="hover:text-body transition-colors">About</Link>
            <Link href="/contact" className="hover:text-body transition-colors">Contact</Link>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
