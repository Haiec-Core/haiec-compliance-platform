import { NextResponse } from "next/server";

//This currently doesn't work and is an open issue in Sentry
// https://github.com/getsentry/sentry-javascript/issues/7228
export function GET() {
  function work() {
    throw new Error("API Test 3");
  }
  work();

  return NextResponse.json({ name: "John Doe" });
}
