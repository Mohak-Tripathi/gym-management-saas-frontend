import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['muscletech.s3.ap-south-1.amazonaws.com'],
  },
};

export default nextConfig;
