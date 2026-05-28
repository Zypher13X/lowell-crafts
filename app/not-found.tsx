import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="font-serif text-8xl text-subtle">◇</p>
      <h1 className="mt-6 font-serif text-4xl text-body">Page Not Found</h1>
      <p className="mt-4 max-w-sm text-muted">
        This stitch got dropped somewhere along the way. Let&apos;s get you back on track.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-md bg-accent px-6 py-3 text-sm font-medium text-on-accent transition-opacity hover:opacity-90"
      >
        Back to Shop
      </Link>
    </div>
  );
}
