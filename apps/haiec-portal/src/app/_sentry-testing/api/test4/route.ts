import * as Sentry from "@sentry/nextjs";
import { NextResponse } from "next/server";

export function GET() {
  try {
    throw new Error("API Test 4");
  } catch (error) {
    Sentry.captureException(error);
  }

  return NextResponse.json({ name: "John Doe" });
}
