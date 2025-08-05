declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SUPABASE_URL: string;
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
      STRIPE_SECRET_KEY: string;
      NODE_ENV: "test" | "development" | "production";
      PORT?: string;
      PWD: string;
      SUPABASE_SERVICE_ROLE_KEY: string;
      SUPABASE_PROJECT_REF: string;
      NEXT_PUBLIC_VERCEL_URL?: string;
      NEXT_PUBLIC_SITE_URL?: string;
      SUPABASE_JWT_SECRET: string;
      STRIPE_WEBHOOK_SECRET: string;
      ADMIN_EMAIL: string;
      NEXT_PUBLIC_SENTRY_DSN: string;
      NEXT_PUBLIC_POSTHOG_API_KEY: string;
      NEXT_PUBLIC_POSTHOG_APP_ID: string;
      NEXT_PUBLIC_POSTHOG_HOST: string;
      NEXT_PUBLIC_GA_ID: string;
      UNKEY_ROOT_KEY: string;
      UNKEY_API_ID: string;
      TESTMAIL_PREFIX?: string;
      OPENAI_API_KEY?: string;
    }
  }
}

export {};
