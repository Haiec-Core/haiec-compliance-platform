import { systemPrompt } from '@/lib/ai/prompts';
import {
  UIMessage,
  appendResponseMessages,
  createDataStreamResponse,
  smoothStream,
  streamText,
} from 'ai';

import { isProductionEnvironment } from '@/constants';
import { deleteChatById, generateTitleFromUserMessage, getChatById, getMaybeChatById, saveChat, saveMessages } from '@/data/user/chat';
import { myProvider } from '@/lib/ai/providers';
import { createDocument } from '@/lib/ai/tools/create-document';
import { getWeather } from '@/lib/ai/tools/get-weather';
import { requestSuggestions } from '@/lib/ai/tools/request-suggestions';
import { updateDocument } from '@/lib/ai/tools/update-document';
import { Json } from '@/lib/database.types';
import {
  generateUUID,
  getMostRecentUserMessage,
  getTrailingMessageId,
} from '@/lib/utils';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { serverGetLoggedInUser } from '@/utils/server/serverGetLoggedInUser';

export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const {
      id,
      messages,
      selectedChatModel,
      workspaceId,
    }: {
      id: string;
      messages: Array<UIMessage>;
      selectedChatModel: string;
      workspaceId: string;
    } = await request.json();

    console.log("chat ", id, messages, selectedChatModel, workspaceId)

    const user = await serverGetLoggedInUser();
    const supabaseClient = await createSupabaseUserServerComponentClient();
    const { data: sessionData } = await supabaseClient.auth.getSession();

    if (!sessionData || !sessionData.session) {
      return new Response('Unauthorized', { status: 401 });
    }
    const session = sessionData.session;

    const userMessage = getMostRecentUserMessage(messages);

    if (!userMessage) {
      return new Response('No user message found', { status: 400 });
    }

    const chat = await getMaybeChatById({ id });

    if (!chat) {
      const title = await generateTitleFromUserMessage({
        message: userMessage,
      });

      await saveChat({ id, workspaceId, title, visibility: 'private' });
    } else {
      if (chat.workspace_id !== workspaceId) {
        return new Response('Unauthorized', { status: 401 });
      }
    }

    await saveMessages({
      messages: [
        {
          chat_id: id,
          id: userMessage.id,
          role: 'user',
          parts: userMessage.parts as Json,
          attachments: (userMessage.experimental_attachments ?? []) as unknown as Json[],
          created_at: new Date().toISOString(),
        },
      ],
    });

    return createDataStreamResponse({
      execute: (dataStream) => {
        const result = streamText({
          model: myProvider.languageModel(selectedChatModel),
          system: systemPrompt({ selectedChatModel }),
          messages,
          maxSteps: 5,
          experimental_activeTools:
            selectedChatModel === 'chat-model-reasoning'
              ? []
              : [
                'getWeather',
                'createDocument',
                'updateDocument',
                'requestSuggestions',
              ],
          experimental_transform: smoothStream({ chunking: 'word' }),
          experimental_generateMessageId: generateUUID,
          tools: {
            getWeather,
            createDocument: createDocument({ session, dataStream, workspaceId }),
            updateDocument: updateDocument({ session, dataStream, workspaceId }),
            requestSuggestions: requestSuggestions({
              session,
              dataStream,
              workspaceId,
            }),
          },
          onFinish: async ({ response }) => {
            if (session.user?.id) {
              try {
                const assistantId = getTrailingMessageId({
                  messages: response.messages.filter(
                    (message) => message.role === 'assistant',
                  ),
                });

                if (!assistantId) {
                  throw new Error('No assistant message found!');
                }

                const [, assistantMessage] = appendResponseMessages({
                  messages: [userMessage],
                  responseMessages: response.messages,
                });

                await saveMessages({
                  messages: [
                    {
                      id: assistantId,
                      chat_id: id,
                      role: assistantMessage.role,
                      parts: assistantMessage.parts as Json,
                      attachments:
                        (assistantMessage.experimental_attachments ?? []) as unknown as Json[],
                      created_at: new Date().toISOString(),
                    },
                  ],
                });
              } catch (_) {
                console.error('Failed to save chat');
              }
            }
          },
          experimental_telemetry: {
            isEnabled: isProductionEnvironment,
            functionId: 'stream-text',
          },
        });

        result.consumeStream();

        result.mergeIntoDataStream(dataStream, {
          sendReasoning: true,
        });
      },
      onError: () => {
        return 'Oops, an error occurred!';
      },
    });
  } catch (error) {
    console.log(error);
    return new Response('An error occurred while processing your request!', {
      status: 404,
    });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return new Response('Not Found', { status: 404 });
  }

  const supabaseClient = await createSupabaseUserServerComponentClient();
  const { data: sessionData } = await supabaseClient.auth.getSession();

  if (!sessionData || !sessionData.session) {
    return new Response('Unauthorized', { status: 401 });
  }

  const session = sessionData.session;

  try {
    const chat = await getChatById({ id });

    await deleteChatById({ id });

    return new Response('Chat deleted', { status: 200 });
  } catch (error) {
    return new Response('An error occurred while processing your request!', {
      status: 500,
    });
  }
}
