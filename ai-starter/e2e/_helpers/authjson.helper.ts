import "core-js/stable/atob";
import { z } from "zod";

const jwtSchema = z
  .object({
    user: z
      .object({
        id: z.string(),
        email: z.string(),
      })
      .passthrough(),
  })
  .passthrough();

export function getUserDetailsFromAuthJson(authJsonString: string) {
  try {
    // Remove the 'base64-' prefix if present
    const jsonString = authJsonString.startsWith("base64-")
      ? authJsonString.slice(7)
      : authJsonString;

    // Decode the base64 string
    const decodedJson = atob(jsonString);

    // Parse the JSON
    const authJson = JSON.parse(decodedJson);
    // Validate the auth JSON structure
    const { user } = jwtSchema.parse(authJson);

    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Invalid auth JSON or JWT");
  }
}
