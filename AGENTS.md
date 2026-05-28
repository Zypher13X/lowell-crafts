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

---

## 13. Deployment

- **Auto-deploy** triggers on push to `main` or `repository_dispatch` (Sanity webhook)
- Secrets required in GitHub: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`
- Build output is `./out` — served from `gh-pages` branch
- Sanity Studio lives in `./studio` — deployed separately to `lowell-crafts.sanity.studio`
- After adding a new field to the Sanity schema, re-deploy the studio: `cd studio && npx sanity deploy`
