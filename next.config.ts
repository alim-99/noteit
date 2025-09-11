import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'img.clerk.com' },
      { hostname: '*.clerk.accounts.dev' },
      { hostname: '*.clerk.accounts.lclclerk.com' }
    ]
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  // Required for Clerk authentication to work in production
  env: {
    NEXT_PUBLIC_CLERK_FRONTEND_API: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? 
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.replace('pk_test_', '').replace('pk_live_', '') : ''
  }
};

export default nextConfig;
