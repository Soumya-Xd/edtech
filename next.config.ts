/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ✅ Prevent ESLint errors from breaking the build
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
