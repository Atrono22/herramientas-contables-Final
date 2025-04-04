/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/herramientas-contables-Final' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/herramientas-contables-Final/' : '',
}

module.exports = nextConfig