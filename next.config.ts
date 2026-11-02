import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // basePath: "/",
  allowedDevOrigins: [
    "10.244.199.35",
    "localhost",
    "127.0.0.1",
    "*.local",
  ],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
