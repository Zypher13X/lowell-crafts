import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useFavorites } from "@/lib/useFavorites";

const KEY = "lowell-crafts-favorites";

describe("useFavorites", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("starts with an empty favorites set when localStorage is empty", () => {
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favorites.size).toBe(0);
  });

  it("reads existing favorites from localStorage on mount", () => {
    localStorage.setItem(KEY, JSON.stringify(["abc", "def"]));
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favorites.has("abc")).toBe(true);
    expect(result.current.favorites.has("def")).toBe(true);
  });

  it("toggle adds an id to favorites", () => {
    const { result } = renderHook(() => useFavorites());
    act(() => { result.current.toggle("craft-1"); });
    expect(result.current.favorites.has("craft-1")).toBe(true);
  });

  it("toggle removes an id that is already favorited", () => {
    localStorage.setItem(KEY, JSON.stringify(["craft-1"]));
    const { result } = renderHook(() => useFavorites());
    act(() => { result.current.toggle("craft-1"); });
    expect(result.current.favorites.has("craft-1")).toBe(false);
  });

  it("persists to localStorage after toggle", () => {
    const { result } = renderHook(() => useFavorites());
    act(() => { result.current.toggle("craft-2"); });
    const stored = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    expect(stored).toContain("craft-2");
  });

  it("removes from localStorage after un-favoriting", () => {
    localStorage.setItem(KEY, JSON.stringify(["craft-2"]));
    const { result } = renderHook(() => useFavorites());
    act(() => { result.current.toggle("craft-2"); });
    const stored = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    expect(stored).not.toContain("craft-2");
  });

  it("isFavorited returns true for a saved id", () => {
    localStorage.setItem(KEY, JSON.stringify(["craft-x"]));
    const { result } = renderHook(() => useFavorites());
    expect(result.current.isFavorited("craft-x")).toBe(true);
  });

  it("isFavorited returns false for an unknown id", () => {
    const { result } = renderHook(() => useFavorites());
    expect(result.current.isFavorited("nope")).toBe(false);
  });

  it("handles corrupted localStorage gracefully", () => {
    localStorage.setItem(KEY, "not-valid-json{{{");
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favorites.size).toBe(0);
  });
});
