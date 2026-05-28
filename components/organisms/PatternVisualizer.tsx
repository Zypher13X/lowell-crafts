"use client";

import { useState } from "react";
import { PATTERNS, YARN_COLORS, buildDefaultColors, getContrastColor, type PatternColors } from "@/lib/patterns";
import GrannySquareSVG from "@/components/atoms/patterns/GrannySquareSVG";
import BucketHatSVG from "@/components/atoms/patterns/BucketHatSVG";
import MarketToteSVG from "@/components/atoms/patterns/MarketToteSVG";
import TurtleSVG from "@/components/atoms/patterns/TurtleSVG";
import SolidSquareSVG from "@/components/atoms/patterns/SolidSquareSVG";
import SunflowerSVG from "@/components/atoms/patterns/SunflowerSVG";
import StripedSquareSVG from "@/components/atoms/patterns/StripedSquareSVG";
import MiteredSquareSVG from "@/components/atoms/patterns/MiteredSquareSVG";
import WindmillSVG from "@/components/atoms/patterns/WindmillSVG";

const SVG_MAP: Record<string, React.ComponentType<{ colors: Record<string, string>; svgId?: string }>> = {
  granny:    GrannySquareSVG,
  hat:       BucketHatSVG,
  tote:      MarketToteSVG,
  turtle:    TurtleSVG,
  solid:     SolidSquareSVG,
  sunflower: SunflowerSVG,
  striped:   StripedSquareSVG,
  mitered:   MiteredSquareSVG,
  windmill:  WindmillSVG,
};

export default function PatternVisualizer() {
  const [patternId, setPatternId] = useState("granny");
  const [colors, setColors] = useState<PatternColors>(buildDefaultColors);
  const [activeRegion, setActiveRegion] = useState("center");

  const pattern = PATTERNS.find((p) => p.id === patternId)!;
  const PatternSVG = SVG_MAP[patternId];
  const currentColors = colors[patternId];

  function applyColor(hex: string) {
    setColors((prev) => ({
      ...prev,
      [patternId]: { ...prev[patternId], [activeRegion]: hex },
    }));
  }

  function handlePatternChange(id: string) {
    setPatternId(id);
    setActiveRegion(PATTERNS.find((p) => p.id === id)!.regions[0].id);
  }

  function resetColors() {
    setColors((prev) => ({
      ...prev,
      [patternId]: Object.fromEntries(
        pattern.regions.map((r) => [r.id, r.defaultColor])
      ),
    }));
  }

  function downloadSVG() {
    const el = document.getElementById("pattern-preview-svg");
    if (!el) return;
    const data = new XMLSerializer().serializeToString(el);
    const blob = new Blob([data], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${pattern.label.toLowerCase().replace(/\s+/g, "-")}-colorway.svg`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
      {/* ── Left: Preview ───────────────────────────────── */}
      <div className="flex flex-col gap-5 lg:flex-1">
        {/* Pattern tabs */}
        {PATTERNS.length > 1 && (
          <div className="flex gap-2">
            {PATTERNS.map((p) => (
              <button
                key={p.id}
                onClick={() => handlePatternChange(p.id)}
                aria-pressed={patternId === p.id}
                className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                  patternId === p.id
                    ? "border-[var(--color-accent)] bg-accent text-on-accent"
                    : "border-default bg-surface text-muted hover:text-body"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        )}

        {/* SVG canvas */}
        <div className="overflow-hidden rounded-2xl border border-default bg-surface p-8 shadow-sm">
          <PatternSVG colors={currentColors} svgId="pattern-preview-svg" />
        </div>

        <p className="text-sm text-muted">{pattern.description}</p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={downloadSVG}
            className="flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-on-accent transition-opacity hover:opacity-90"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
              <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
              <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
            </svg>
            Save as SVG
          </button>
          <button
            onClick={resetColors}
            className="rounded-md border border-default px-4 py-2 text-sm text-muted transition-colors hover:text-body"
          >
            Reset
          </button>
        </div>
      </div>

      {/* ── Right: Controls ─────────────────────────────── */}
      <div className="flex flex-col gap-8 lg:w-72">
        {/* Region selector */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-subtle">
            Select a Region
          </p>
          <div className="flex flex-col gap-2">
            {pattern.regions.map((region) => (
              <button
                key={region.id}
                onClick={() => setActiveRegion(region.id)}
                aria-pressed={activeRegion === region.id}
                className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-left transition-all ${
                  activeRegion === region.id
                    ? "border-[var(--color-accent)] bg-surface shadow-sm"
                    : "border-default bg-surface hover:border-[var(--color-muted)]"
                }`}
              >
                <span
                  className="h-6 w-6 flex-shrink-0 rounded-full border border-black/10 shadow-sm transition-colors"
                  style={{ backgroundColor: currentColors[region.id] }}
                  aria-hidden="true"
                />
                <span className={`flex-1 text-sm ${activeRegion === region.id ? "font-medium text-body" : "text-muted"}`}>
                  {region.label}
                </span>
                {activeRegion === region.id && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 flex-shrink-0 text-subtle" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Yarn palette */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-subtle">
            Pick a Yarn Colour
          </p>
          <div className="grid grid-cols-4 gap-2">
            {YARN_COLORS.map((yarn) => {
              const isActive = currentColors[activeRegion] === yarn.hex;
              return (
                <button
                  key={yarn.hex}
                  onClick={() => applyColor(yarn.hex)}
                  title={yarn.name}
                  aria-label={`${yarn.name}${isActive ? " — applied" : ""}`}
                  aria-pressed={isActive}
                  style={{ backgroundColor: yarn.hex }}
                  className={`relative aspect-square rounded-lg border-2 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] ${
                    isActive
                      ? "scale-110 border-[var(--color-accent)]"
                      : "border-transparent hover:border-[var(--color-muted)]"
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-4 w-4 drop-shadow"
                        style={{ color: getContrastColor(yarn.hex) }}
                        aria-hidden="true"
                      >
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-center text-xs text-subtle">
            Colouring:{" "}
            <span className="font-medium text-muted">
              {pattern.regions.find((r) => r.id === activeRegion)?.label}
            </span>
          </p>
        </div>

        {/* Current palette summary */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-subtle">
            Your Colorway
          </p>
          <div className="flex gap-1.5">
            {pattern.regions.map((r) => (
              <div
                key={r.id}
                className="flex-1 rounded"
                title={r.label}
                style={{ backgroundColor: currentColors[r.id], height: "28px" }}
              />
            ))}
          </div>
          <p className="mt-2 text-center text-xs text-subtle">
            {pattern.regions
              .map((r) => YARN_COLORS.find((y) => y.hex === currentColors[r.id])?.name ?? "Custom")
              .join(" · ")}
          </p>
        </div>
      </div>
    </div>
  );
}
