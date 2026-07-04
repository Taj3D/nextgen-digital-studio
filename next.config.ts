import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Vercel handles output automatically; standalone is for VPS self-hosting */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
