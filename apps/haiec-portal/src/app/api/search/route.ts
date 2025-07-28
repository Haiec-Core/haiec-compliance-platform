import { getPages } from "@/app/source";
import { createSearchAPI } from "fumadocs-core/search/server";

/**
 * Creates and exports a search API endpoint using the 'advanced' search mode.
 *
 * @remarks
 * This API endpoint is created using the `createSearchAPI` function from fumadocs-core.
 * It uses the 'advanced' search mode and indexes pages retrieved from the `getPages` function.
 *
 * @returns An object with a GET method that handles search requests.
 */
export const { GET } = createSearchAPI("advanced", {
  indexes: getPages().map((page) => ({
    /** The title of the page */
    title: page.data.title,
    /** Structured data associated with the page */
    structuredData: page.data.structuredData,
    /** Unique identifier for the page, using its URL */
    id: page.url,
    /** The URL of the page */
    url: page.url,
  })),
});
