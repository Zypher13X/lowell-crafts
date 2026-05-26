import Gallery from "@/components/Gallery";
import { crafts } from "@/data/crafts";

export default function HomePage() {
  return (
    <div>
      <div className="mb-12 text-center">
        <h1 className="font-serif text-4xl text-stone-800 sm:text-5xl">Handmade with Care</h1>
        <p className="mt-4 text-stone-500 sm:text-lg">
          Each piece is made by hand in small batches — ceramics, textiles, wood, and more.
        </p>
      </div>
      <Gallery crafts={crafts} />
    </div>
  );
}
