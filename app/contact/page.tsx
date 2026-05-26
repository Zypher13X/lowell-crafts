import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Lowell Crafts",
};

const EMAIL = "hello@lowellcrafts.com";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-serif text-4xl text-stone-800">Get in Touch</h1>
      <p className="mt-4 text-stone-500">
        Questions about a piece, custom orders, or just want to say hello — I'd love to hear from
        you.
      </p>

      <form
        action={`mailto:${EMAIL}`}
        method="get"
        className="mt-10 space-y-6"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-stone-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 w-full rounded-md border border-stone-300 bg-white px-4 py-2.5 text-stone-800 placeholder-stone-400 focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-500"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-stone-700">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="mt-1 w-full rounded-md border border-stone-300 bg-white px-4 py-2.5 text-stone-800 placeholder-stone-400 focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-500"
            placeholder="What's this about?"
          />
        </div>

        <div>
          <label htmlFor="body" className="block text-sm font-medium text-stone-700">
            Message
          </label>
          <textarea
            id="body"
            name="body"
            rows={6}
            className="mt-1 w-full rounded-md border border-stone-300 bg-white px-4 py-2.5 text-stone-800 placeholder-stone-400 focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-500"
            placeholder="Your message…"
          />
        </div>

        <button
          type="submit"
          className="rounded-md bg-stone-800 px-6 py-3 text-sm font-medium text-stone-50 transition-colors hover:bg-stone-700"
        >
          Open in Mail
        </button>
      </form>

      <p className="mt-6 text-sm text-stone-400">
        Or email directly:{" "}
        <a href={`mailto:${EMAIL}`} className="text-stone-600 underline hover:text-stone-800">
          {EMAIL}
        </a>
      </p>
    </div>
  );
}
