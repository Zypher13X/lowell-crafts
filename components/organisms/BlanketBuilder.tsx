"use client";

import { useState } from "react";
import { PATTERNS, YARN_COLORS, getContrastColor } from "@/lib/patterns";
import {
  BLANKET_PRESETS, ARRANGEMENTS, autoColsForRows, getGrannyPatterns,
  buildDefaultVariant, type BlanketVariant,
} from "@/lib/blanket";
import BlanketPreviewSVG from "@/components/atoms/BlanketPreviewSVG";
import ArrangementThumbnail from "@/components/atoms/ArrangementThumbnail";

const GRANNY_PATTERNS = getGrannyPatterns();
const MAX_VARIANTS = GRANNY_PATTERNS.length;

// One visually distinct primary color per slot so arrangement thumbnails are readable
const SLOT_COLORS = [
  "#D4A830", // Mustard
  "#4A7AA0", // Denim
  "#C96B4A", // Terracotta
  "#7A9E7E", // Sage
  "#982040", // Cranberry
  "#9888C8", // Lavender
];

function buildSlotVariant(patternId: string, slotIdx: number): BlanketVariant {
  const base = buildDefaultVariant(patternId);
  const [firstKey] = Object.keys(base.colors);
  return { ...base, colors: { ...base.colors, [firstKey]: SLOT_COLORS[slotIdx % SLOT_COLORS.length] } };
}

function buildInitialVariants(count: number): BlanketVariant[] {
  return GRANNY_PATTERNS.slice(0, count).map((p, i) => buildSlotVariant(p.id, i));
}

export default function BlanketBuilder() {
  const [variantCount, setVariantCount]       = useState(2);
  const [variants, setVariants]               = useState<BlanketVariant[]>(() => buildInitialVariants(2));
  const [activeVariantIdx, setActiveVariantIdx] = useState(0);
  const [presetId, setPresetId]               = useState("throw");
  const [customRows, setCustomRows]           = useState(14);
  const [arrangementId, setArrangementId]     = useState("checkerboard");
  const [activeRegion, setActiveRegion]       = useState(
    () => GRANNY_PATTERNS[0].regions[0].id
  );

  const rows = presetId === "custom"
    ? customRows
    : (BLANKET_PRESETS.find((p) => p.id === presetId)?.rows ?? 12);
  const cols = autoColsForRows(rows);

  const activeVariant = variants[activeVariantIdx];
  const activePattern = PATTERNS.find((p) => p.id === activeVariant?.patternId)!;

  function handleVariantCountChange(newCount: number) {
    setVariantCount(newCount);
    setVariants((prev) => {
      if (newCount > prev.length) {
        const additions = GRANNY_PATTERNS
          .slice(prev.length, newCount)
          .map((p, i) => buildSlotVariant(p.id, prev.length + i));
        return [...prev, ...additions];
      }
      return prev.slice(0, newCount);
    });
    if (activeVariantIdx >= newCount) {
      const nextIdx = newCount - 1;
      setActiveVariantIdx(nextIdx);
      const nextPattern = PATTERNS.find((p) => p.id === variants[nextIdx]?.patternId);
      if (nextPattern) setActiveRegion(nextPattern.regions[0].id);
    }
    // If the active arrangement requires more variants than newCount, fall back to solid
    const currentArr = ARRANGEMENTS.find((a) => a.id === arrangementId);
    if (currentArr && currentArr.minVariants > newCount) {
      setArrangementId("solid");
    }
  }

  function handlePatternChange(patternId: string) {
    const newPattern = PATTERNS.find((p) => p.id === patternId)!;
    setVariants((prev) =>
      prev.map((v, i) => (i === activeVariantIdx ? buildDefaultVariant(patternId) : v))
    );
    setActiveRegion(newPattern.regions[0].id);
  }

  function handleActiveVariantChange(idx: number) {
    setActiveVariantIdx(idx);
    const pattern = PATTERNS.find((p) => p.id === variants[idx].patternId)!;
    setActiveRegion(pattern.regions[0].id);
  }

  function applyColor(hex: string) {
    setVariants((prev) =>
      prev.map((v, i) =>
        i === activeVariantIdx
          ? { ...v, colors: { ...v.colors, [activeRegion]: hex } }
          : v
      )
    );
  }

  function downloadSVG() {
    const el = document.getElementById("blanket-preview-svg");
    if (!el) return;
    const data = new XMLSerializer().serializeToString(el);
    const blob = new Blob([data], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "my-blanket.svg";
    a.click();
    URL.revokeObjectURL(url);
  }

  const thumbnailColors = variants.map((v) => Object.values(v.colors)[0] ?? "#ccc");

  return (
    <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
      {/* ── Left: Controls ──────────────────────────────── */}
      <div className="flex flex-col gap-8 lg:w-80">

        {/* Square type count */}
        <section>
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-subtle">
            Square Types
          </p>
          <div className="flex gap-2">
            {Array.from({ length: MAX_VARIANTS }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => handleVariantCountChange(n)}
                aria-pressed={variantCount === n}
                className={`h-9 w-9 rounded-md border text-sm font-medium transition-colors ${
                  variantCount === n
                    ? "border-[var(--color-accent)] bg-accent text-on-accent"
                    : "border-default bg-surface text-muted hover:text-body"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </section>

        {/* Variant editor */}
        <section>
          {/* Variant tabs */}
          <div className="mb-4 flex flex-wrap gap-1.5">
            {variants.map((v, i) => {
              const swatch = Object.values(v.colors)[0] ?? "#ccc";
              return (
                <button
                  key={i}
                  onClick={() => handleActiveVariantChange(i)}
                  aria-pressed={activeVariantIdx === i}
                  className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-colors ${
                    activeVariantIdx === i
                      ? "border-[var(--color-accent)] bg-accent text-on-accent"
                      : "border-default bg-surface text-muted hover:text-body"
                  }`}
                >
                  <span
                    className="h-3 w-3 rounded-full border border-black/10"
                    style={{ backgroundColor: swatch }}
                    aria-hidden="true"
                  />
                  Square {i + 1}
                </button>
              );
            })}
          </div>

          {activeVariant && (
            <>
              {/* Pattern selector */}
              <p className="mb-2 text-xs font-medium uppercase tracking-widest text-subtle">
                Pattern
              </p>
              <div className="mb-4 flex flex-wrap gap-1.5">
                {GRANNY_PATTERNS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handlePatternChange(p.id)}
                    aria-pressed={activeVariant.patternId === p.id}
                    className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                      activeVariant.patternId === p.id
                        ? "border-[var(--color-accent)] bg-accent text-on-accent"
                        : "border-default bg-surface text-muted hover:text-body"
                    }`}
                  >
                    {p.shortLabel}
                  </button>
                ))}
              </div>

              {/* Region selector */}
              <p className="mb-2 text-xs font-medium uppercase tracking-widest text-subtle">
                Color Regions
              </p>
              <div className="mb-4 flex flex-col gap-1.5">
                {activePattern.regions.map((region) => (
                  <button
                    key={region.id}
                    onClick={() => setActiveRegion(region.id)}
                    aria-pressed={activeRegion === region.id}
                    className={`flex items-center gap-3 rounded-lg border px-3 py-2 text-left transition-all ${
                      activeRegion === region.id
                        ? "border-[var(--color-accent)] bg-surface shadow-sm"
                        : "border-default bg-surface hover:border-[var(--color-muted)]"
                    }`}
                  >
                    <span
                      className="h-5 w-5 flex-shrink-0 rounded-full border border-black/10 shadow-sm"
                      style={{ backgroundColor: activeVariant.colors[region.id] }}
                      aria-hidden="true"
                    />
                    <span className={`flex-1 text-sm ${activeRegion === region.id ? "font-medium text-body" : "text-muted"}`}>
                      {region.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Yarn palette */}
              <div className="grid grid-cols-8 gap-1.5">
                {YARN_COLORS.map((yarn) => {
                  const isActive = activeVariant.colors[activeRegion] === yarn.hex;
                  return (
                    <button
                      key={yarn.hex}
                      onClick={() => applyColor(yarn.hex)}
                      title={yarn.name}
                      aria-label={`${yarn.name}${isActive ? " — applied" : ""}`}
                      aria-pressed={isActive}
                      style={{ backgroundColor: yarn.hex }}
                      className={`relative aspect-square rounded border-2 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] ${
                        isActive
                          ? "scale-110 border-[var(--color-accent)]"
                          : "border-transparent hover:border-[var(--color-muted)]"
                      }`}
                    >
                      {isActive && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <svg
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-3 w-3 drop-shadow"
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
            </>
          )}
        </section>

        {/* Size presets */}
        <section>
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-subtle">
            Blanket Size
          </p>
          <div className="flex flex-wrap gap-1.5">
            {BLANKET_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => setPresetId(preset.id)}
                aria-pressed={presetId === preset.id}
                className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                  presetId === preset.id
                    ? "border-[var(--color-accent)] bg-accent text-on-accent"
                    : "border-default bg-surface text-muted hover:text-body"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {presetId === "custom" && (
            <div className="mt-3 flex items-center gap-3">
              <label htmlFor="custom-rows" className="text-xs text-muted">
                Height (squares)
              </label>
              <input
                id="custom-rows"
                type="number"
                min={4}
                max={40}
                step={2}
                value={customRows}
                onChange={(e) => {
                  const v = parseInt(e.target.value, 10);
                  if (!isNaN(v) && v >= 4) setCustomRows(Math.round(v / 2) * 2);
                }}
                className="w-20 rounded border border-default bg-surface px-2 py-1 text-sm text-body"
              />
            </div>
          )}

          <p className="mt-2 text-xs text-subtle">
            {cols} wide · {rows} tall · {cols * rows} squares
          </p>
        </section>

        {/* Arrangement */}
        <section>
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-subtle">
            Arrangement
          </p>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-3">
            {ARRANGEMENTS.map((arr) => {
              const isDisabled = arr.minVariants > variantCount;
              const isActive = arrangementId === arr.id;
              return (
              <button
                key={arr.id}
                onClick={() => !isDisabled && setArrangementId(arr.id)}
                aria-pressed={isActive}
                aria-disabled={isDisabled}
                disabled={isDisabled}
                title={isDisabled ? `Requires ${arr.minVariants}+ square types` : undefined}
                className={`flex flex-col items-center gap-1.5 rounded-lg border p-2 transition-all ${
                  isDisabled
                    ? "cursor-not-allowed border-default opacity-35"
                    : isActive
                    ? "border-[var(--color-accent)] bg-surface shadow-sm"
                    : "border-default bg-surface hover:border-[var(--color-muted)]"
                }`}
              >
                <div className="w-full overflow-hidden rounded">
                  <ArrangementThumbnail
                    arrangement={arr}
                    variantCount={variantCount}
                    paletteColors={thumbnailColors}
                  />
                </div>
                <span className="text-center text-xs text-muted leading-tight">{arr.label}</span>
              </button>
            );
            })}
          </div>
        </section>
      </div>

      {/* ── Right: Preview ───────────────────────────────── */}
      <div className="flex flex-col gap-4 lg:flex-1">
        <div className="overflow-hidden rounded-2xl border border-default bg-surface p-6 shadow-sm">
          <BlanketPreviewSVG
            variants={variants}
            rows={rows}
            cols={cols}
            arrangementId={arrangementId}
            svgId="blanket-preview-svg"
          />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted">
            {cols} × {rows} granny squares
          </p>
          <button
            onClick={downloadSVG}
            className="flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-on-accent transition-opacity hover:opacity-90"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
              <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
            </svg>
            Save as SVG
          </button>
        </div>
      </div>
    </div>
  );
}
