import type { Metadata } from "next";
import { Suspense } from "react";
import ContactForm from "@/components/molecules/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Lowell Crafts for custom orders, questions, or just to say hello.",
};

const EMAIL = "hello@lowellcrafts.com";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-serif text-4xl text-body">Get in Touch</h1>
      <p className="mt-4 text-muted">
        Questions about a piece, custom orders, or just want to say hello — I&apos;d love to hear
        from you.
      </p>

      <Suspense fallback={<div className="mt-10 h-64 animate-pulse rounded-lg bg-surface" />}>
        <ContactForm />
      </Suspense>

      <p className="mt-6 text-sm text-subtle">
        Or email directly:{" "}
        <a href={`mailto:${EMAIL}`} className="text-muted underline hover:text-body">
          {EMAIL}
        </a>
      </p>
    </div>
  );
}
