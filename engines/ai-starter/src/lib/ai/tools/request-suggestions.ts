import { getDocumentById, saveSuggestions } from '@/data/user/chat';
import { generateUUID } from '@/lib/utils';
import { DBTable, WorkspaceDocumentSuggestion } from '@/types';
import { Session } from '@supabase/supabase-js';
import { DataStreamWriter, streamObject, tool } from 'ai';
import { z } from 'zod';
import { myProvider } from '../providers';

interface RequestSuggestionsProps {
  session: Session;
  dataStream: DataStreamWriter;
  workspaceId: string;
}

export const requestSuggestions = ({
  session,
  dataStream,
}: RequestSuggestionsProps) =>
  tool({
    description: 'Request suggestions for a document',
    parameters: z.object({
      documentId: z
        .string()
        .describe('The ID of the document to request edits'),
    }),
    execute: async ({ documentId }) => {
      const document = await getDocumentById({ id: documentId });

      if (!document || !document.content) {
        return {
          error: 'Document not found',
        };
      }

      const suggestions: Array<
        Omit<WorkspaceDocumentSuggestion, 'user_id' | 'created_at' | 'document_created_at'>
      > = [];

      const { elementStream } = streamObject({
        model: myProvider.languageModel('artifact-model'),
        system:
          'You are a help writing assistant. Given a piece of writing, please offer suggestions to improve the piece of writing and describe the change. It is very important for the edits to contain full sentences instead of just words. Max 5 suggestions.',
        prompt: document.content,
        output: 'array',
        schema: z.object({
          originalSentence: z.string().describe('The original sentence'),
          suggestedSentence: z.string().describe('The suggested sentence'),
          description: z.string().describe('The description of the suggestion'),
        }),
      });

      for await (const element of elementStream) {
        const suggestion: DBTable<'workspace_document_suggestions'> = {
          original_text: element.originalSentence,
          suggested_text: element.suggestedSentence,
          description: element.description,
          id: generateUUID(),
          document_id: documentId,
          is_resolved: false,
          user_id: session.user.id,
          created_at: new Date().toISOString(),
          document_created_at: document.created_at,
        };

        dataStream.writeData({
          type: 'suggestion',
          content: suggestion,
        });

        suggestions.push(suggestion);
      }

      if (session.user?.id) {
        const userId = session.user.id;

        await saveSuggestions({
          suggestions: suggestions.map((suggestion) => ({
            ...suggestion,
            user_id: userId,
            created_at: new Date().toISOString(),
            document_created_at: document.created_at,
          })),
        });
      }

      return {
        id: documentId,
        title: document.title,
        kind: document.kind,
        message: 'Suggestions have been added to the document',
      };
    },
  });
