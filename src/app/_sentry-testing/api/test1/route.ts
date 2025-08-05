import { NextResponse } from "next/server";

const doAsyncWork = () => Promise.reject(new Error("API Test 1"));
doAsyncWork();

export function GET() {
  return NextResponse.json({ name: "John Doe" });
}
