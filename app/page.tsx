import Gallery from "@/components/Gallery";
import Marquee from "@/components/Marquee";
import { crafts } from "@/data/crafts";

export default function HomePage() {
  return (
    <div>
      <div className="mb-4 text-center">
        <h1
          className="font-serif font-normal leading-tight text-stone-800"
          style={{ fontSize: "clamp(2.75rem, 7vw, 6.5rem)" }}
        >
          Handmade
          <br />
          with Care
        </h1>
        <p className="mx-auto mt-5 max-w-md text-stone-500 sm:text-lg">
          Each piece is made by hand in small batches — ceramics, textiles, wood, and more.
        </p>
      </div>

      <Marquee />

      <Gallery crafts={crafts} />
    </div>
  );
}
