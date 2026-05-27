import Gallery from "@/components/Gallery";
import Marquee from "@/components/Marquee";
import { getCrafts } from "@/lib/queries";

export default async function HomePage() {
  const crafts = await getCrafts();

  return (
    <div>
      <div className="mb-4 text-center">
        <h1
          className="font-serif font-normal leading-tight text-body"
          style={{ fontSize: "clamp(2.75rem, 7vw, 6.5rem)" }}
        >
          Crocheted
          <br />
          with Love
        </h1>
        <p className="mx-auto mt-5 max-w-md text-muted sm:text-lg">
          Each piece is hooked by hand in small batches — wearables, home goods, amigurumi, and more.
        </p>
      </div>

      <Marquee />

      <Gallery crafts={crafts} />
    </div>
  );
}
