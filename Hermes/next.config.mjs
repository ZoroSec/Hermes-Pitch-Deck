/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // No ESLint config in repo; don't block builds on lint.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
