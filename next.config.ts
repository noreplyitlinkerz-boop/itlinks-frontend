import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable source maps in production for obfuscation
  productionBrowserSourceMaps: false,

  // Configure API Proxy to hide backend URL
  async rewrites() {
    return [
      {
        source: "/api/proxy/:path*",
        destination: `${
          process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001"
        }/:path*`,
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "3001",
      },
      {
        protocol: "https",
        hostname: "example.com",
      },
    ],
  },
};

export default nextConfig;
