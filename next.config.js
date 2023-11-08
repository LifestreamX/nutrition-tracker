/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },

  test: /\\.(png|jp(e*)g|svg|gif)$/,
  use: ['file-loader'],

  images: {
    domains: ['www.edamam.com'],
  },

  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
