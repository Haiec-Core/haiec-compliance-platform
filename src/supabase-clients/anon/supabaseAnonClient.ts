import { Database } from "@/lib/database.types";
import { createClient } from "@supabase/supabase-js";

// A simple wrapper around the Supabase client that uses the service role key
// Suitable for scenarios where you don't have access to Next.js environment and just want to access
// the admin privileges
export const supabaseAnonClient = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    global: {
      fetch,
    },
  },
);
