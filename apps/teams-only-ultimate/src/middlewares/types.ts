import { User } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export interface MiddlewareFunction {
  (
    request: NextRequest,
    maybeUser: User | null,
  ): Promise<[NextResponse, User | null]>;
}

export interface MiddlewareConfig {
  matcher: string | string[];
  middleware: MiddlewareFunction;
}
