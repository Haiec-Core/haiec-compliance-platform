import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const searchParamsSchema = z.object({
  path: z.string().default("/"),
  type: z.enum(["layout", "page"]).optional(),
});

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const { path, type } = searchParamsSchema.parse(
    Object.fromEntries(searchParams),
  );
  revalidatePath(path, type);
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
