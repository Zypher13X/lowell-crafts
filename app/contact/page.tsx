import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Lowell Crafts",
};

const EMAIL = "hello@lowellcrafts.com";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-serif text-4xl text-body">Get in Touch</h1>
      <p className="mt-4 text-muted">
        Questions about a piece, custom orders, or just want to say hello — I'd love to hear from
        you.
      </p>

      <form action={`mailto:${EMAIL}`} method="get" className="mt-10 space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-body">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 w-full rounded-md border border-default bg-surface px-4 py-2.5 text-body placeholder-[var(--color-subtle)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-body">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="mt-1 w-full rounded-md border border-default bg-surface px-4 py-2.5 text-body placeholder-[var(--color-subtle)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
            placeholder="What's this about?"
          />
        </div>

        <div>
          <label htmlFor="body" className="block text-sm font-medium text-body">
            Message
          </label>
          <textarea
            id="body"
            name="body"
            rows={6}
            className="mt-1 w-full rounded-md border border-default bg-surface px-4 py-2.5 text-body placeholder-[var(--color-subtle)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
            placeholder="Your message…"
          />
        </div>

        <button
          type="submit"
          className="rounded-md bg-accent px-6 py-3 text-sm font-medium text-on-accent transition-colors hover:opacity-90"
        >
          Open in Mail
        </button>
      </form>

      <p className="mt-6 text-sm text-subtle">
        Or email directly:{" "}
        <a href={`mailto:${EMAIL}`} className="text-muted underline hover:text-body">
          {EMAIL}
        </a>
      </p>
    </div>
  );
}
