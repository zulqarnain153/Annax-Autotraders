/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [],
    formats: ["image/avif", "image/webp"],
  },
  compress: true,
};

export default nextConfig;
