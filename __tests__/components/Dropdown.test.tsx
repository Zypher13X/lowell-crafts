import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Dropdown from "@/components/molecules/Dropdown";

const OPTIONS = [
  { value: "light", label: "Light" },
  { value: "dark",  label: "Dark"  },
  { value: "craft", label: "Craft" },
] as const;

type Val = (typeof OPTIONS)[number]["value"];

function setup(value: Val = "light", onChange = vi.fn()) {
  const user = userEvent.setup();
  render(
    <Dropdown options={OPTIONS} value={value} onChange={onChange} triggerLabel="Theme" />
  );
  return { user, onChange };
}

describe("Dropdown", () => {
  it("renders the trigger button with current label", () => {
    setup("dark");
    expect(screen.getByRole("button", { name: "Theme" })).toBeInTheDocument();
    expect(screen.getByText("Dark")).toBeInTheDocument();
  });

  it("menu is hidden initially", () => {
    setup();
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("opens menu on click", async () => {
    const { user } = setup();
    await user.click(screen.getByRole("button", { name: "Theme" }));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(screen.getAllByRole("menuitem")).toHaveLength(3);
  });

  it("calls onChange with selected value and closes menu", async () => {
    const { user, onChange } = setup("light");
    await user.click(screen.getByRole("button", { name: "Theme" }));
    await user.click(screen.getByRole("menuitem", { name: /dark/i }));
    expect(onChange).toHaveBeenCalledWith("dark");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("closes on Escape key", async () => {
    const { user } = setup();
    await user.click(screen.getByRole("button", { name: "Theme" }));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("shows checkmark on the active option", async () => {
    const { user } = setup("craft");
    await user.click(screen.getByRole("button", { name: "Theme" }));
    const items = screen.getAllByRole("menuitem");
    // Active item (Craft) has font-medium class
    const craftItem = items.find((el) => el.textContent?.includes("Craft"));
    expect(craftItem).toHaveClass("font-medium");
  });

  it("toggles closed when trigger is clicked again", async () => {
    const { user } = setup();
    const trigger = screen.getByRole("button", { name: "Theme" });
    await user.click(trigger);
    expect(screen.getByRole("menu")).toBeInTheDocument();
    await user.click(trigger);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("closes on outside click", async () => {
    const { user } = setup();
    await user.click(screen.getByRole("button", { name: "Theme" }));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    await user.click(document.body);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });
});
