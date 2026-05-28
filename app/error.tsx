"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="font-serif text-8xl text-subtle">✕</p>
      <h2 className="mt-6 font-serif text-4xl text-body">Something went wrong</h2>
      <p className="mt-4 max-w-sm text-muted">
        {error.message || "An unexpected error occurred. Please try again."}
      </p>
      <button
        onClick={reset}
        className="mt-8 rounded-md bg-accent px-6 py-3 text-sm font-medium text-on-accent transition-opacity hover:opacity-90"
      >
        Try Again
      </button>
    </div>
  );
}
