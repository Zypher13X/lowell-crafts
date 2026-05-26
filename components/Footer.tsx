export default function Footer() {
  return (
    <footer className="mt-24 border-t border-stone-200 bg-stone-50">
      <div className="mx-auto max-w-5xl px-6 py-8 text-center text-sm text-stone-500">
        <p>© {new Date().getFullYear()} Lowell Crafts. Made with care.</p>
      </div>
    </footer>
  );
}
