"use client";

import { useSearchParams } from "next/navigation";
import FormField from "@/components/molecules/FormField";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";

const EMAIL = "hello@lowellcrafts.com";

export default function ContactForm() {
  const params = useSearchParams();
  const defaultSubject = params.get("subject") ?? "";
  const defaultBody = params.get("body") ?? "";

  return (
    <form action={`mailto:${EMAIL}`} method="get" className="mt-10 space-y-6">
      <FormField id="name" label="Name">
        <Input id="name" name="name" type="text" placeholder="Your name" />
      </FormField>

      <FormField id="subject" label="Subject">
        <Input
          id="subject"
          name="subject"
          type="text"
          placeholder="What's this about?"
          defaultValue={defaultSubject}
        />
      </FormField>

      <FormField id="body" label="Message">
        <Textarea
          id="body"
          name="body"
          rows={6}
          placeholder="Your message…"
          defaultValue={defaultBody}
        />
      </FormField>

      <button
        type="submit"
        className="rounded-md bg-accent px-6 py-3 text-sm font-medium text-on-accent transition-colors hover:opacity-90"
      >
        Open in Mail
      </button>
    </form>
  );
}
