/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Habilitar output standalone para optimización en Docker
  output: 'standalone',
  images: {
    domains: [],
  },
};

module.exports = nextConfig;

