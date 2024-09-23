/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL,
    NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL,
    NEXT_PUBLIC_CLOUDFRONT_URL: process.env.NEXT_PUBLIC_CLOUDFRONT_URL,
    NEXT_PUBLIC_ACCESS_KEY_ID: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
    NEXT_PUBLIC_ACCESS_KEY_PASSWORD: process.env.NEXT_PUBLIC_ACCESS_KEY_PASSWORD,
    NEXT_PUBLIC_CLERK_JWT_KEY: process.env.NEXT_PUBLIC_CLERK_JWT_KEY,
  },
  images: {
    domains: [
      "images.unsplash.com", 
      "assets.aceternity.com",
      "unsplash.com",
      "wallpapercave.com"
    ],
  },
  experimental: {
    workerThreads: false,
    cpus: 1
  }
};

if (process.env.NODE_ENV === 'development') {
  // Dynamic import for development setup
  import('@cloudflare/next-on-pages/next-dev').then(({ setupDevPlatform }) => {
    setupDevPlatform();
  });
}

export default nextConfig;