import Link from "next/link";

export default function Nav() {
  return (
    <header className="border-b border-stone-200 bg-stone-50">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-serif text-xl tracking-wide text-stone-800">
          Lowell Crafts
        </Link>
        <nav className="flex gap-6 text-sm text-stone-600">
          <Link href="/" className="hover:text-stone-900 transition-colors">
            Shop
          </Link>
          <Link href="/about" className="hover:text-stone-900 transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-stone-900 transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
