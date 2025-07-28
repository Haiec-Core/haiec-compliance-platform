import { User } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { middlewareList } from "./middlewares/middlewareList";
import { matchesPath } from "./middlewares/utils";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const applicableMiddlewares = middlewareList.filter((m) =>
    matchesPath(m.matcher, pathname),
  );

  let response: NextResponse | undefined;
  // this is the user that lives through the middleware chain
  // if we did not have this, we would have to evaluate the user session in every middleware function
  // which requires duplicate api calls to supabase servers and is extremely slow
  let maybeUser: User | null = null;

  for (const { middleware } of applicableMiddlewares) {
    // get the new user session from the middleware if modified
    const [result, newMaybeUser] = await middleware(request, maybeUser);
    // update the user session for the next middleware
    maybeUser = newMaybeUser;
    if (!result.ok) {
      return result;
    }
  }

  return response || NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api (api routes) (api routes have their own auth checks)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
