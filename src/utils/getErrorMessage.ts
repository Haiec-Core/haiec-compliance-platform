import { ZodError } from "zod";

export function getErrorMessage(error: unknown): string {
  if (error instanceof ZodError) {
    console.log("zod error");
    return error.issues.map((issue) => issue.message).join(". ");
  } else {
    return String(error);
  }
}
