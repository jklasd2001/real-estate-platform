import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    qualities: [100],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
