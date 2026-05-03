/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  
  // Disable strict mode for smoother animations
  reactStrictMode: false,
  
  // Image optimization settings
  images: {
    domains: [],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Headers for performance and security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  
  // Webpack configuration for Three.js
  webpack: (config) => {
    config.externals = [
      ...config.externals,
      { canvas: 'canvas' }
    ];
    return config;
  },
};

module.exports = nextConfig;
