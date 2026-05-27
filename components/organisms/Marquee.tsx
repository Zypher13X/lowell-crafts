const TEXT = "handmade crochet · hook & yarn · slow stitch · made with love · one of a kind · ";
const REPEATED = TEXT.repeat(8);

export default function Marquee() {
  return (
    <div className="overflow-hidden border-y border-default py-3 my-10 bg-page">
      <div
        className="flex whitespace-nowrap text-sm tracking-widest uppercase text-subtle"
        style={{ animation: "marquee 28s linear infinite", width: "max-content" }}
      >
        <span>{REPEATED}</span>
        <span aria-hidden>{REPEATED}</span>
      </div>
    </div>
  );
}
