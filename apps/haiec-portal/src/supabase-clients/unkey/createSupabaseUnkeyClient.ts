"use server";

import { Database } from "@/lib/database.types";
import { createClient } from "@supabase/supabase-js";
import { verifyKey } from "@unkey/api";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { z } from "zod";

function createJWT(userId: string) {
  const payload = {
    sub: userId,
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour expiry
    role: "authenticated",
    aud: "authenticated",
    iss: "https://ultimate-demo.usenextbase.com",
    iat: Math.floor(Date.now() / 1000) - 60,
  };

  const token = jwt.sign(payload, process.env.SUPABASE_JWT_SECRET);
  return token;
}

const resultSchema = z.object({
  externalId: z.string(),
  valid: z.boolean(),
  expires: z.number().optional(),
});

export async function createSupabaseUnkeyClient(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Missing or invalid Authorization header");
  }

  const token = authHeader.split(" ")[1];

  const { result, error } = await verifyKey(token);
  if (error) {
    throw error;
  }

  const { externalId: userId } = resultSchema.parse(result);

  const jwt = createJWT(userId);
  const client = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      global: {
        headers: {
          Authorization: "Bearer " + jwt,
        },
      },
    },
  );

  return client;
}
