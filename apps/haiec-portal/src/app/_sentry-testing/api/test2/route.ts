import { NextResponse } from "next/server";

// uncomment this to test async errors
function work() {
  throw new Error("API Test 2");
}

work();

export function GET() {
  return NextResponse.json({ name: "John Doe" });
}
