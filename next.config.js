/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    viewTransition: true,
  },
  // Enable static page generation by default
  output: 'standalone',
  // Enable React strict mode
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

export default nextConfig
