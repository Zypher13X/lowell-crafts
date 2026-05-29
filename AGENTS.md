# Lowell Crafts — Build Guidelines

These rules were built from real decisions made during this project. Follow them exactly; don't guess or default to training-data conventions.

---

## 1. Next.js Version Warning

<!-- BEGIN:nextjs-agent-rules -->
This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

**Known breaking changes in this version (16.x):**

- `params` and `searchParams` in page/layout props are `Promise<{...}>` — always `await` them
- `generateMetadata` must also `await params`
- `useSearchParams` must be wrapped in `<Suspense>` at the call site or its parent

---

## 2. Stack at a Glance

| Layer | Technology |
|---|---|
| Framework | Next.js 16.x App Router |
| Output | `output: "export"` → static site in `./out` |
| Hosting | GitHub Pages (`gh-pages` branch, `Zypher13X/lowell-crafts`) |
| Base path | `/lowell-crafts` — always set in `next.config.ts` |
| Styling | Tailwind CSS v4 — see Section 5 |
| CMS | Sanity v3 (project `2kxlijwk`, dataset `production`) |
| Font | Lora (Google Fonts via `next/font/google`) |
| Deploy | GitHub Actions → `peaceiris/actions-gh-pages@v4` |

---

## 3. Static Export Rules (Critical)

`output: "export"` has strict constraints. Violating these breaks the build silently or at deploy time.

### Dynamic routes MUST return > 0 static params

`generateStaticParams` must return at least one entry. If the CMS dataset is empty, Next.js throws:
> `Page "/shop/[slug]" is missing "generateStaticParams()"`

**Fix:** return a `[{ slug: "_" }]` placeholder when the CMS returns empty. The page calls `notFound()` for any unknown slug, so the placeholder safely renders as a 404.

```ts
export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  if (slugs.length === 0) return [{ slug: "_" }];
  return slugs.map((slug) => ({ slug }));
}
```

### Sitemap needs `force-static`

```ts
export const dynamic = "force-static";
```

Add this to `app/sitemap.ts` or the build errors with "export const dynamic not configured".

### No server-only APIs

These are unsupported with static export and will break the build:
- Server Actions (`"use server"`)
- Route Handlers (`app/api/*/route.ts`) that use `Request`
- `cookies()`, `headers()`
- Incremental Static Regeneration (`revalidate`)
- Next.js Image Optimization (use `images: { unoptimized: true }` + Sanity's own CDN)

### `useSearchParams` needs Suspense

Any client component using `useSearchParams` must be wrapped in `<Suspense>` by its parent:

```tsx
<Suspense fallback={<div className="animate-pulse ..." />}>
  <ContactForm />
</Suspense>
```

---

## 4. Component Architecture (Atomic Design)

```
components/
  atoms/        Single-element, no business logic (Badge, Input, Label, Textarea, FavoriteButton, FadeIn)
  molecules/    Compose atoms (FormField, ThemeToggle, ImageCarousel, ContactForm)
  organisms/    Full sections with data awareness (Nav, Footer, Gallery, CraftCard, Testimonials, Marquee)
  providers/    Context providers (ThemeProvider)
lib/
  sanity.ts     Client + urlFor + SanityImageRef type
  queries.ts    All Sanity fetch functions + TypeScript interfaces
  useFavorites.ts  localStorage favorites hook
  useInView.ts  IntersectionObserver scroll hook
```

**Rules:**
- Atoms never import from molecules or organisms
- Organisms can import atoms and molecules, never other organisms
- Client components are marked `"use client"` at the top; server components have no directive
- Hooks (`use*.ts`) live in `lib/`, not in `components/`

### Shared Dropdown molecule

`components/molecules/Dropdown.tsx` is a generic `Dropdown<T extends string>` used by **both** ThemeToggle and Gallery sort. Never use a native `<select>` or build a one-off custom dropdown — compose this instead.

```tsx
<Dropdown<SortValue>
  options={SORT_OPTIONS}  // { label, value, icon? }[]
  value={sort}
  onChange={setSort}
  triggerLabel="Sort by"
  align="right"           // or "left"
/>
```

Dropdown handles: outside-click close, Escape + focus return, focus-first-item on open, `aria-haspopup="menu"`, `aria-expanded`, `role="menu"`, `role="menuitem"`, checkmark on active item.

---

## 5. Styling (Tailwind v4)

Tailwind v4 is imported differently — do not use the v3 config format.

```css
/* globals.css — correct */
@import "tailwindcss";

@theme inline {
  --font-serif: var(--font-lora), Georgia, serif;
}

@utility bg-page { background-color: var(--color-page); }
```

**Never use:**
- `tailwind.config.js` — not used in v4
- `theme.extend` — extend via `@theme` in CSS
- Arbitrary values like `bg-[#1c1917]` for theme colors — use semantic tokens instead

### Semantic token classes

All UI uses these classes, not raw colors:

| Class | Token | Use |
|---|---|---|
| `bg-page` | `--color-page` | Page background |
| `bg-surface` | `--color-surface` | Cards, inputs |
| `bg-accent` | `--color-accent` | Primary CTA buttons |
| `text-body` | `--color-text` | Primary text |
| `text-muted` | `--color-muted` | Secondary text |
| `text-subtle` | `--color-subtle` | Placeholder, decorative |
| `text-on-accent` | `--color-on-accent` | Text on accent bg |
| `border-default` | `--color-border` | All borders |

When you must use a raw CSS var (e.g. in a dynamic class), use `var(--color-border)` not a hard-coded hex.

---

## 6. Theme System

Three themes: `light` (default), `dark`, `craft`. Set via `data-theme` on `<html>`.

**Anti-flash pattern** — this script in `<head>` runs before React hydrates:
```html
<script>try{var t=localStorage.getItem('theme')||'light';document.documentElement.setAttribute('data-theme',t);}catch(e){}</script>
```

**ThemeProvider** reads the DOM attribute synchronously in `useState()` initializer — no `useEffect`, no flicker:
```ts
function readTheme(): Theme {
  const attr = document.documentElement.getAttribute("data-theme") as Theme;
  return VALID.includes(attr) ? attr : "light";
}
useState(readTheme); // sync init, not useState(null) + useEffect
```

**Craft mode** has dashed borders on `article` and an SVG knit-stitch background — both applied via CSS selectors in `globals.css`, not via JS or inline styles.

---

## 7. Sanity CMS

### Client setup (`lib/sanity.ts`)

- Env var `NEXT_PUBLIC_SANITY_PROJECT_ID` is validated at module load — throws if missing
- Use named export `createImageUrlBuilder` (not default) from `@sanity/image-url`
- Use `.auto("format")` on all image URLs so Sanity serves WebP/AVIF where supported

```ts
urlFor(craft.image).width(800).auto("format").url()
```

### Queries (`lib/queries.ts`)

- All fields are fetched in a shared `CRAFT_FIELDS` constant — add new fields there, not scattered across functions
- GROQ: `"slug": slug.current` — dereference Sanity slug objects in the query, not in TypeScript
- All fetch functions have try/catch returning empty array / null on failure — never let a CMS outage crash the page
- `getRelatedCrafts(category, excludeId)` for same-category products on detail pages

### Schema rules

- `slug` field is required, uses `{ source: "title", maxLength: 96 }` — auto-generates from title
- `quantity` is optional (`number | null`); UI shows "Only N left" badge when `quantity <= 3 && quantity > 0 && inStock`
- `images[]` array for additional photos beyond the primary `image` field
- All fetch functions handle `null` returns gracefully (CMS may be empty during development)

---

## 8. Accessibility Standards

Every new feature must include:

- **Skip link** — `<a href="#main-content">` visually hidden until focused, first child of `<body>`
- **`id="main-content"`** on `<main>`
- **`aria-current="page"`** on active nav links
- **`aria-label`** on all icon-only buttons
- **`aria-hidden="true"`** on all decorative SVGs
- **`role="menu"` + `aria-haspopup` + `aria-expanded`** on dropdowns; Escape closes and returns focus to trigger
- **`aria-pressed`** on toggle buttons (filter pills)
- **`role="region"` + `aria-label`** on carousels

---

## 9. Gallery / Filter Pattern

The Gallery uses `animKey = useRef(0)` (not `key={active}`) so the grid container stays mounted while individual card keys change to re-trigger `card-enter` animations.

```tsx
function handleFilter(value) {
  animKey.current += 1; // increment, don't toggle key on the wrapper
  setActive(value);
}

// Card key includes animKey so each card re-mounts on filter change
<div key={`${animKey.current}-${craft._id}`}>
```

---

## 10. Scroll Animations

Use `FadeIn` atom + `useInView` hook for scroll-triggered reveals:

```tsx
import FadeIn from "@/components/atoms/FadeIn";

<FadeIn delay={i * 100}>
  <YourComponent />
</FadeIn>
```

- `useInView` disconnects the observer after the first intersection — elements animate once, not on scroll back
- Stagger with `delay` prop (multiples of 80–100ms)
- Never animate the gallery grid — it has its own `card-enter` CSS animation system

---

## 11. Favorites / localStorage Pattern

`useFavorites` hook (`lib/useFavorites.ts`) manages a `Set<string>` of craft `_id`s. Rules:

- Read from localStorage in `useEffect` (not SSR-safe to read synchronously)
- Write inside the `setFavorites` updater function to keep state and storage in sync
- Pass `isFavorited` and `onFavoriteToggle` as props down to `CraftCard` — the hook lives in `Gallery`, not in the card
- `FavoriteButton` calls `e.preventDefault()` to avoid navigating when the card is a link

---

## 12. What Not to Do

| Don't | Why |
|---|---|
| Add `"use client"` to page files | They're server components; data fetching runs at build time |
| Use `key={active}` on the gallery wrapper | Unmounts the entire grid — use `animKey.current` pattern instead |
| Import `createImageUrlBuilder` as a default | Package changed to named export; default is deprecated |
| Put studio in root TypeScript compilation | Add `"studio"` to `exclude` in `tsconfig.json` |
| Hardcode hex values for themed UI | Use semantic token classes so all three themes work |
| Use `output: "export"` with Server Actions | Incompatible — use mailto links or external form services |
| Skip `force-static` on `app/sitemap.ts` | Build error: "export const dynamic not configured" |
| Return empty array from `generateStaticParams` | Build error: treated as "missing" the function entirely |
| Mention shipping | No shipping on this site — use "Inquire to Order" → contact page |
| Use British English spelling | Site is American English — color not colour, center not centre, favorite not favourite |

---

## 13. Color Studio — SVG Pattern System

The `/visualizer` page (`app/visualizer/page.tsx`) wraps `PatternVisualizer` (organism), which renders interactive SVG pattern previews.

### File layout

```
lib/patterns.ts                          — PATTERNS array, YARN_COLORS, types, helpers
components/atoms/patterns/               — one SVG component per pattern
  GrannySquareSVG.tsx
  BucketHatSVG.tsx
  MarketToteSVG.tsx
  TurtleSVG.tsx
  SolidSquareSVG.tsx
  SunflowerSVG.tsx
  StripedSquareSVG.tsx
  MiteredSquareSVG.tsx
  WindmillSVG.tsx
components/organisms/PatternVisualizer.tsx  — orchestrator; SVG_MAP ties ids to components
```

### Adding a new pattern — checklist

1. Add a `PatternDef` entry to `PATTERNS` in `lib/patterns.ts` — define `id`, `label`, `description`, and `regions[]` with `defaultColor`
2. Create `components/atoms/patterns/<Name>SVG.tsx` — see conventions below
3. Add `{ id: Component }` to `SVG_MAP` in `PatternVisualizer.tsx`
4. No changes needed anywhere else — the visualizer renders regions dynamically

### SVG component conventions

Every pattern SVG must follow these rules:

```tsx
interface Props {
  colors: Record<string, string>;
  svgId?: string;
}

export default function MySVG({ colors, svgId }: Props) {
  const { regionA = "#fallback", regionB = "#fallback" } = colors;
  const pid = svgId ?? "mypattern-default";   // namespace all IDs with pid

  return (
    <svg
      id={svgId}           // NOT pid — svgId is used by downloadSVG()
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
      aria-label="Descriptive label for screen readers"
      role="img"
    >
      <defs>
        {/* Dot texture — use in every pattern */}
        <pattern id={`${pid}-dots`} x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="6" cy="6" r="1.5" fill="black" fillOpacity="0.05" />
        </pattern>
        {/* ClipPaths, masks, etc. — always prefix id with pid */}
        <clipPath id={`${pid}-body-clip"}>...</clipPath>
      </defs>

      {/* Drop shadow ellipse or rect */}
      {/* Main shapes */}
      {/* Stitch lines (dashed, strokeOpacity 0.05–0.08) */}
      {/* Dot texture overlay last */}
    </svg>
  );
}
```

**Rules:**
- Always destructure `colors` with a fallback default for every region — ensures the SVG renders even if a color is missing
- All `<defs>` IDs must be prefixed with `pid` — prevents collisions when multiple SVGs are on the same page
- `id={svgId}` on the `<svg>` element (not `pid`) — `downloadSVG()` in PatternVisualizer uses `document.getElementById("pattern-preview-svg")` to find it
- Drop shadow: an ellipse or rect with `fill="black" fillOpacity="0.07"` offset slightly down
- Stitch lines: dashed strokes `strokeOpacity="0.05–0.08"`, `strokeWidth="1–2"`, `strokeDasharray="10,7"` or `"8,5"`
- Texture: apply `fill={url(#${pid}-dots)}` overlay at the end so it sits on top of fill colors

### Helpers

```ts
// Hexagonal polygon points (used in TurtleSVG)
function hexPts(cx: number, cy: number, r: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const a = ((i * 60 - 30) * Math.PI) / 180;
    return `${+(cx + r * Math.cos(a)).toFixed(1)},${+(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
}
```

### lib/patterns.ts types

```ts
YARN_COLORS     — 16 named yarn hex values, used by the palette grid
PATTERNS        — PatternDef[]; drives tabs, region selectors, and default colors
buildDefaultColors() — returns PatternColors (Record<patternId, Record<regionId, hex>>)
getContrastColor(hex) — returns "#1c1917" or "#fafaf9" based on luminance; used for checkmark ink on yarn swatches
```

---

## 14. Blanket Builder

The `/blanket` page (`app/blanket/page.tsx`) wraps `BlanketBuilder` (organism), which renders an interactive blanket designer built on the granny SVG pattern system.

### File layout

```
lib/blanket.ts                          — BlanketVariant, BlanketConfig types, ARRANGEMENTS, BLANKET_PRESETS, helpers
components/atoms/patterns/*Inner.tsx    — inner SVG content for each of the 6 granny patterns (no <svg> wrapper)
components/atoms/BlanketPreviewSVG.tsx  — live blanket SVG using <symbol>/<use> for efficiency
components/atoms/ArrangementThumbnail.tsx — mini colored-grid SVGs for arrangement picker
components/organisms/BlanketBuilder.tsx — full builder UI (client component)
app/blanket/page.tsx                    — server component page
```

### Inner component pattern

The 6 granny SVG components (`GrannySquareSVG`, `SolidSquareSVG`, etc.) each delegate their content to a `*Inner.tsx` sibling. Inner components:

- Accept `{ colors, pid }` — no `svgId`, no SVG wrapper
- Return a React Fragment with `<defs>` and SVG shape elements
- Are used by both the outer SVG wrappers (for Color Studio) and the blanket builder's `<symbol>` elements

```tsx
// outer wrapper stays thin:
export default function GrannySquareSVG({ colors, svgId }: Props) {
  const pid = svgId ?? "gs-default";
  return <svg id={svgId} viewBox="0 0 400 400" ...><GrannySquareInner colors={colors} pid={pid} /></svg>;
}

// inside BlanketPreviewSVG:
<symbol id="bsq-0" viewBox="0 0 400 400">
  <GrannySquareInner colors={variant.colors} pid="bsq-0" />
</symbol>
```

### BlanketPreviewSVG — symbol/use approach

- Defines one `<symbol id="bsq-{i}">` per variant in `<defs>`
- Uses `<use href="#bsq-{i}" x={col*TILE} y={row*TILE} width={TILE} height={TILE}>` for each grid cell
- TILE = 100 in SVG coordinate space; outer SVG viewBox = `cols*100 × rows*100`
- `INNER_MAP` maps pattern IDs to Inner components — add new granny patterns there

### lib/blanket.ts exports

```ts
autoColsForRows(rows)   — cols = Math.max(2, Math.round(rows * 3 / 8) * 2)  [3:4 width:height ratio, always even]
getGrannyPatterns()     — PATTERNS.filter(p => p.groupId === 'granny'); auto-picks up new patterns
buildDefaultVariant(id) — BlanketVariant with default colors for a given pattern ID
BLANKET_PRESETS         — Baby(6), Lapghan(10), Throw(12), Full(16), King(20), Custom
ARRANGEMENTS            — 7 ArrangementDef objects, each with id, label, fn(row, col, rows, cols, count) → index
```

### Adding a new granny pattern to the blanket builder

1. Create `components/atoms/patterns/<Name>Inner.tsx` (inner content only — see Inner component pattern above)
2. Add `{ id: Component }` to `INNER_MAP` in `BlanketPreviewSVG.tsx`
3. That's it — `getGrannyPatterns()` auto-includes it; the builder picks it up with no other changes needed

---

## 15. Deployment

- **Auto-deploy** triggers on push to `main` or `repository_dispatch` (Sanity webhook)
- Secrets required in GitHub: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`
- Build output is `./out` — served from `gh-pages` branch
- Sanity Studio lives in `./studio` — deployed separately to `lowell-crafts.sanity.studio`
- After adding a new field to the Sanity schema, re-deploy the studio: `cd studio && npx sanity deploy`
