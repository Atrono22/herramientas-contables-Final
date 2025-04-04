/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/herramientas-contables-Final',
  assetPrefix: '/herramientas-contables-Final/',
  trailingSlash: true,
}

module.exports = nextConfig