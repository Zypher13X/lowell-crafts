export default function Footer() {
  return (
    <footer className="mt-24 border-t border-default bg-page">
      <div className="mx-auto max-w-5xl px-6 py-8 text-center text-sm text-muted">
        <p>© {new Date().getFullYear()} Lowell Crafts. Made with care.</p>
      </div>
    </footer>
  );
}
