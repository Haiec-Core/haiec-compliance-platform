'use server';

import { getSuggestionsByDocumentId } from "@/data/user/chat";


export async function getSuggestions({ documentId }: { documentId: string }) {
  const suggestions = await getSuggestionsByDocumentId({ documentId });
  return suggestions ?? [];
}
