// Generated by Wrangler
// by running `wrangler types --env-interface CloudflareEnv env.d.ts`

interface CloudflareEnv {
}

declare namespace NodeJS {
    interface ProcessEnv {
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
        CLERK_SECRET_KEY: string;
        NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL: string;
        NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL: string;
        NEXT_PUBLIC_CLOUDFRONT_URL: string;
        NEXT_PUBLIC_ACCESS_KEY_ID: string;
        NEXT_PUBLIC_ACCESS_KEY_PASSWORD: string;
        NEXT_PUBLIC_CLERK_JWT_KEY: string;
    }
  }
