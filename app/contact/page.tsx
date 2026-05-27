import type { Metadata } from "next";
import FormField from "@/components/molecules/FormField";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";

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
        <FormField id="name" label="Name">
          <Input id="name" name="name" type="text" placeholder="Your name" />
        </FormField>

        <FormField id="subject" label="Subject">
          <Input id="subject" name="subject" type="text" placeholder="What's this about?" />
        </FormField>

        <FormField id="body" label="Message">
          <Textarea id="body" name="body" rows={6} placeholder="Your message…" />
        </FormField>

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
