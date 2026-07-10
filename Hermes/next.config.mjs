/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === 'true'
let assetPrefix = ''
let basePath = ''
if (isGithubActions) {
  const repo = process.env.GITHUB_REPOSITORY?.replace(/.*?\//, '') ?? ''
  assetPrefix = `/${repo}/` // -> /Hermes-Pitch-Deck/
  basePath = `/${repo}` // -> /Hermes-Pitch-Deck
}

const nextConfig = {
  output: 'export', // static HTML (required for GitHub Pages)
  basePath, // only applied in CI, so local dev stays at /
  assetPrefix,
  images: { unoptimized: true }, // no image-optimization server on Pages
  reactStrictMode: true,
  eslint: {
    // No ESLint config in repo; don't block builds on lint.
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
