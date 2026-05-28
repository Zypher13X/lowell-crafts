"use client";

import dynamic from "next/dynamic";

const PatternVisualizer = dynamic(
  () => import("@/components/organisms/PatternVisualizer"),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start animate-pulse">
        <div className="flex flex-col gap-5 lg:flex-1">
          <div className="flex gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-8 w-28 rounded-full bg-surface" />
            ))}
          </div>
          <div className="aspect-square rounded-2xl bg-surface" />
        </div>
        <div className="flex flex-col gap-8 lg:w-72">
          <div className="h-48 rounded-lg bg-surface" />
          <div className="h-40 rounded-lg bg-surface" />
        </div>
      </div>
    ),
  }
);

export default function PatternVisualizerClient() {
  return <PatternVisualizer />;
}
