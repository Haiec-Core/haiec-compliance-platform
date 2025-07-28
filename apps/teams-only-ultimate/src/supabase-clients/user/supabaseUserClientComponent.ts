// https://supabase.com/docs/guides/auth/auth-helpers/nextjs-server-components#creating-a-supabase-client
import { Database } from "@/lib/database.types";
import { createBrowserClient } from "@supabase/ssr";
// apologies for the name, but it's the best I could come up with as
// the util exported from @supabase/auth-helpers-nextjs is called
// createClientComponentClient
export const supabaseUserClientComponent = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);
