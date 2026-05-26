import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/lowell-crafts",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
