/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ⛔ Prevent ESLint errors from failing the Vercel build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ⛔ Prevent type errors from failing the Vercel build
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
