import { Database } from "@/lib/database.types";
import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export const createSupabaseMiddlewareClient = (request: NextRequest) => {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseMiddlewareClient = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  return {
    supabase: supabaseMiddlewareClient,
    supabaseResponse,
  };
};
