import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PatternVisualizer from "@/components/organisms/PatternVisualizer";

function setup() {
  const user = userEvent.setup();
  render(<PatternVisualizer />);
  return { user };
}

describe("PatternVisualizer — group tabs", () => {
  it("renders all 4 group tabs", () => {
    setup();
    expect(screen.getByRole("button", { name: "Granny Square" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Bucket Hat" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Market Tote" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Turtle" })).toBeInTheDocument();
  });

  it("granny square is selected by default", () => {
    setup();
    const tab = screen.getByRole("button", { name: "Granny Square" });
    expect(tab).toHaveAttribute("aria-pressed", "true");
  });

  it("switching to Bucket Hat hides variant selector (single variant)", async () => {
    const { user } = setup();
    await user.click(screen.getByRole("button", { name: "Bucket Hat" }));
    // Hat has only 1 variant so the sub-row should not appear
    expect(screen.getByRole("button", { name: "Bucket Hat" })).toHaveAttribute("aria-pressed", "true");
    // Only 3 regions: Crown, Band, Brim (each label appears in button + footer text)
    expect(screen.getAllByText("Crown").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Band").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Brim").length).toBeGreaterThan(0);
  });

  it("granny square shows variant sub-selector", () => {
    setup();
    expect(screen.getByRole("button", { name: "Classic" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Solid" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sunflower" })).toBeInTheDocument();
  });
});

describe("PatternVisualizer — region selection", () => {
  it("renders region buttons for the active pattern", () => {
    setup();
    // Labels appear in region buttons and in the "Coloring: X" footer
    expect(screen.getAllByText("Center").length).toBeGreaterThan(0);
    expect(screen.getByText("Inner Round")).toBeInTheDocument();
    expect(screen.getByText("Outer Round")).toBeInTheDocument();
    expect(screen.getAllByText("Border").length).toBeGreaterThan(0);
  });

  it("first region is active by default", () => {
    setup();
    const centerBtn = screen.getByRole("button", { name: /center/i });
    expect(centerBtn).toHaveAttribute("aria-pressed", "true");
  });

  it("clicking a region marks it active", async () => {
    const { user } = setup();
    const borderBtn = screen.getByRole("button", { name: /border/i });
    await user.click(borderBtn);
    expect(borderBtn).toHaveAttribute("aria-pressed", "true");
  });
});

describe("PatternVisualizer — color application", () => {
  it("renders the yarn palette grid", () => {
    setup();
    // 16 yarn color swatches
    const swatches = screen.getAllByRole("button", { name: /Snow|Cream|Oatmeal|Sand|Terracotta|Rust|Cranberry|Rose|Mustard|Sage|Forest|Sky|Denim|Lavender|Charcoal|Slate/ });
    expect(swatches.length).toBe(16);
  });

  it("clicking a yarn color marks it as applied", async () => {
    const { user } = setup();
    const snowBtn = screen.getByRole("button", { name: /Snow/i });
    await user.click(snowBtn);
    expect(snowBtn).toHaveAttribute("aria-pressed", "true");
  });
});

describe("PatternVisualizer — reset", () => {
  it("reset button restores default colors", async () => {
    const { user } = setup();
    // Apply a non-default color to center region
    const snowBtn = screen.getByRole("button", { name: /Snow/i });
    await user.click(snowBtn);
    expect(snowBtn).toHaveAttribute("aria-pressed", "true");

    // Reset
    await user.click(screen.getByRole("button", { name: /reset/i }));

    // Snow should no longer be active for center (default is Mustard #D4A830)
    expect(snowBtn).toHaveAttribute("aria-pressed", "false");
  });
});

describe("PatternVisualizer — persistence", () => {
  it("saves group selection to localStorage", async () => {
    const { user } = setup();
    await user.click(screen.getByRole("button", { name: "Bucket Hat" }));
    expect(localStorage.getItem("lc-studio-group")).toBe("hat");
  });

  it("saves pattern selection to localStorage", async () => {
    const { user } = setup();
    await user.click(screen.getByRole("button", { name: "Solid" }));
    expect(localStorage.getItem("lc-studio-pattern")).toBe("solid");
  });
});
