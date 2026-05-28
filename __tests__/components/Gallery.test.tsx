import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Gallery from "@/components/organisms/Gallery";
import type { SanityCraft } from "@/lib/queries";

// CraftCard pulls in next/image and next/link — already mocked globally.
// Sanity image builder needs a stub so urlFor() doesn't throw.
vi.mock("@/lib/sanity", () => ({
  client: {},
  urlFor: () => ({
    width: () => ({ auto: () => ({ url: () => "https://example.com/img.jpg" }) }),
  }),
}));

function makeCraft(overrides: Partial<SanityCraft> = {}): SanityCraft {
  return {
    _id: Math.random().toString(36).slice(2),
    title: "Test Craft",
    slug: "test-craft",
    description: "A lovely piece",
    category: "wearables",
    price: 25,
    inStock: true,
    ...overrides,
  };
}

const CRAFTS: SanityCraft[] = [
  makeCraft({ _id: "1", title: "Bucket Hat",    category: "wearables",    price: 30, slug: "bucket-hat"    }),
  makeCraft({ _id: "2", title: "Market Tote",   category: "accessories",  price: 45, slug: "market-tote"   }),
  makeCraft({ _id: "3", title: "Turtle Plush",  category: "amigurumi",    price: 20, slug: "turtle-plush"  }),
  makeCraft({ _id: "4", title: "Throw Pillow",  category: "home",         price: 35, slug: "throw-pillow"  }),
  makeCraft({ _id: "5", title: "Granny Blanket",category: "home",         price: 80, slug: "granny-blanket"}),
];

function setup() {
  const user = userEvent.setup();
  render(<Gallery crafts={CRAFTS} />);
  return { user };
}

describe("Gallery — initial render", () => {
  it("shows all crafts by default", () => {
    setup();
    expect(screen.getByText("Bucket Hat")).toBeInTheDocument();
    expect(screen.getByText("Market Tote")).toBeInTheDocument();
    expect(screen.getByText("Turtle Plush")).toBeInTheDocument();
  });

  it("renders filter pills", () => {
    setup();
    expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Wearables" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Saved" })).toBeInTheDocument();
  });

  it("All filter is active by default", () => {
    setup();
    expect(screen.getByRole("button", { name: "All" })).toHaveAttribute("aria-pressed", "true");
  });
});

describe("Gallery — category filter", () => {
  it("Wearables filter shows only wearables", async () => {
    const { user } = setup();
    await user.click(screen.getByRole("button", { name: "Wearables" }));
    expect(screen.getByText("Bucket Hat")).toBeInTheDocument();
    expect(screen.queryByText("Market Tote")).not.toBeInTheDocument();
    expect(screen.queryByText("Turtle Plush")).not.toBeInTheDocument();
  });

  it("Home filter shows only home items", async () => {
    const { user } = setup();
    await user.click(screen.getByRole("button", { name: "Home" }));
    expect(screen.getByText("Throw Pillow")).toBeInTheDocument();
    expect(screen.getByText("Granny Blanket")).toBeInTheDocument();
    expect(screen.queryByText("Bucket Hat")).not.toBeInTheDocument();
  });

  it("Amigurumi filter shows only amigurumi", async () => {
    const { user } = setup();
    await user.click(screen.getByRole("button", { name: "Amigurumi" }));
    expect(screen.getByText("Turtle Plush")).toBeInTheDocument();
    expect(screen.queryByText("Bucket Hat")).not.toBeInTheDocument();
  });

  it("shows empty state for a category with no items", async () => {
    const { user } = setup();
    await user.click(screen.getByRole("button", { name: "Saved" }));
    expect(screen.getByText(/no saved pieces yet/i)).toBeInTheDocument();
  });
});

describe("Gallery — search", () => {
  it("filters by title", async () => {
    const { user } = setup();
    await user.type(screen.getByPlaceholderText(/search/i), "Turtle");
    expect(screen.getByText("Turtle Plush")).toBeInTheDocument();
    expect(screen.queryByText("Bucket Hat")).not.toBeInTheDocument();
  });

  it("filters by description", async () => {
    const { user } = setup();
    await user.type(screen.getByPlaceholderText(/search/i), "lovely");
    // All items have "A lovely piece" description so all should show
    expect(screen.getByText("Bucket Hat")).toBeInTheDocument();
    expect(screen.getByText("Turtle Plush")).toBeInTheDocument();
  });

  it("shows no-results state for unknown query", async () => {
    const { user } = setup();
    await user.type(screen.getByPlaceholderText(/search/i), "xyznotfound");
    expect(screen.getByText(/no results for/i)).toBeInTheDocument();
  });
});

describe("Gallery — sort", () => {
  it("sort price asc puts cheapest first", async () => {
    const { user } = setup();
    await user.click(screen.getByRole("button", { name: /sort by/i }));
    await user.click(screen.getByRole("menuitem", { name: /price: low to high/i }));

    const titles = screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent);
    const prices = [20, 25, 25, 25, 30, 35, 45, 80]; // not testing exact order, just cheapest first
    // Turtle (20) should appear before Market Tote (45)
    const turtleIdx = titles.findIndex((t) => t === "Turtle Plush");
    const toteIdx   = titles.findIndex((t) => t === "Market Tote");
    expect(turtleIdx).toBeLessThan(toteIdx);
  });

  it("sort price desc puts most expensive first", async () => {
    const { user } = setup();
    await user.click(screen.getByRole("button", { name: /sort by/i }));
    await user.click(screen.getByRole("menuitem", { name: /price: high to low/i }));

    const titles = screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent);
    const grannyIdx  = titles.findIndex((t) => t === "Granny Blanket");
    const turtleIdx  = titles.findIndex((t) => t === "Turtle Plush");
    expect(grannyIdx).toBeLessThan(turtleIdx);
  });
});
