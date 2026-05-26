import type { Craft } from "@/data/crafts";
import CraftCard from "./CraftCard";

export default function Gallery({ crafts }: { crafts: Craft[] }) {
  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {crafts.map((craft) => (
        <CraftCard key={craft.id} craft={craft} />
      ))}
    </section>
  );
}
