import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output bundles all deps into .next/standalone for minimal Docker/server deploys.
  // For Vercel, this is ignored (Vercel handles Next.js natively) but harmless.
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
  // Allow the sandbox preview panel domain (and any *.space-z.ai subdomain)
  // to load /_next/* dev chunks. Without this, Next.js 16 treats the preview
  // origin as cross-origin and the browser throws ChunkLoadError +
  // "Invalid or unexpected token" because the layout chunk is blocked.
  allowedDevOrigins: [
    "preview-chat-7ab5994f-c017-4acd-ab7d-335149ba15a4.space-z.ai",
    "*.space-z.ai",
    "space-z.ai",
    "localhost:3000",
    "127.0.0.1:3000",
    "0.0.0.0:3000",
  ],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
