import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Lowell Crafts",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-serif text-4xl text-stone-800">About</h1>
      <div className="mt-8 space-y-6 text-stone-600 leading-relaxed">
        <p>
          Lowell Crafts is a one-person studio making objects meant to be used and loved. Everything
          here is shaped, sewn, carved, or folded by hand — no two pieces are exactly alike.
        </p>
        <p>
          I work out of a small studio in the Pacific Northwest, drawing on traditional craft
          techniques and natural materials. My goal is to make things that earn a permanent spot in
          your home.
        </p>
        <p>
          Each item ships carefully wrapped, with a hand-written note. If you have questions about a
          piece or want to discuss a custom order, please reach out on the contact page.
        </p>
      </div>
    </div>
  );
}
