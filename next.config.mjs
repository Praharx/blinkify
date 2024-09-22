/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com", 
      "assets.aceternity.com",
      "unsplash.com"
    ],
  },
  experimental: {
    workerThreads: false,
    cpus: 1
  },
  // Add this line
  runtime: 'edge',
};

export default nextConfig;