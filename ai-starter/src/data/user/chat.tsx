'use server';
import { ArtifactKind } from "@/components/artifact";
import { myProvider } from "@/lib/ai/providers";
import { authActionClient } from "@/lib/safe-action";
import { createSupabaseUserServerComponentClient } from "@/supabase-clients/user/createSupabaseUserServerComponentClient";
import { WorkspaceChatMessage, WorkspaceDocumentSuggestion } from "@/types";
import { serverGetLoggedInUser } from "@/utils/server/serverGetLoggedInUser";
import { ChatVisibility, chatVisibilitySchema } from "@/utils/zod-schemas/chat";
import { generateText, Message } from "ai";

export async function getSuggestions({ documentId }: { documentId: string }) {
  const supabaseClient = await createSupabaseUserServerComponentClient();
  const { data, error } = await supabaseClient
    .from('workspace_document_suggestions')
    .select('*')
    .eq('document_id', documentId);

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}


export async function updateChatVisibilityById({
  chatId,
  visibility,
}: ChatVisibility) {
  try {
    const supabaseClient = await createSupabaseUserServerComponentClient();
    const { data, error } = await supabaseClient
      .from('workspace_chats')
      .update({ visibility })
      .eq('id', chatId);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Failed to update chat visibility in database');
    throw error;
  }
}

export const updateChatVisibilityAction = authActionClient.schema(chatVisibilitySchema).action(async ({ parsedInput }) => {
  return await updateChatVisibilityById(parsedInput);
});



export async function saveChat({
  id,
  title,
  workspaceId,
  visibility,
}: {
  id: string;
  title: string;
  workspaceId: string;
  visibility: ChatVisibility['visibility'];
}) {
  try {
    const user = await serverGetLoggedInUser();
    const supabaseClient = await createSupabaseUserServerComponentClient();
    const {
      data: chatData,
      error: chatError,
    } = await supabaseClient
      .from('workspace_chats')
      .insert({
        id,
        created_at: new Date().toISOString(),
        workspace_id: workspaceId,
        title,
        visibility,
      });

    if (chatError) {
      throw new Error(chatError.message);
    }

    return chatData;
  } catch (error) {
    console.error('Failed to save chat in database');
    throw error;
  }
}

export async function deleteChatById({ id }: { id: string }) {
  try {
    const supabaseClient = await createSupabaseUserServerComponentClient();
    const {
      data: deletedChat,
      error: deletedChatError,
    } = await supabaseClient
      .from('workspace_chats')
      .delete()
      .eq('id', id)
      .select('*');

    if (deletedChatError) {
      throw new Error(deletedChatError.message);
    }

    return deletedChat;
  } catch (error) {
    console.error('Failed to delete chat by id from database');
    throw error;
  }
}

export async function getChatsByWorkspaceId({
  workspaceId,
  limit,
  startingAfter,
  endingBefore,
}: {
  workspaceId: string;
  limit: number;
  startingAfter: string | null;
  endingBefore: string | null;
}) {
  try {
    const supabaseClient = await createSupabaseUserServerComponentClient();
    const extendedLimit = limit + 1;

    let query = supabaseClient
      .from('workspace_chats')
      .select('*')
      .eq('workspace_id', workspaceId)
      .order('created_at', { ascending: false })
      .limit(extendedLimit);

    if (startingAfter) {
      // Get the created_at timestamp of the starting chat
      const { data: selectedChat, error: selectedChatError } = await supabaseClient
        .from('workspace_chats')
        .select('created_at')
        .eq('id', startingAfter)
        .single();

      if (selectedChatError || !selectedChat) {
        throw new Error(`Chat with id ${startingAfter} not found`);
      }

      // Filter to get chats created after the selected chat
      query = query.gt('created_at', selectedChat.created_at);
    } else if (endingBefore) {
      // Get the created_at timestamp of the ending chat
      const { data: selectedChat, error: selectedChatError } = await supabaseClient
        .from('workspace_chats')
        .select('created_at')
        .eq('id', endingBefore)
        .single();

      if (selectedChatError || !selectedChat) {
        throw new Error(`Chat with id ${endingBefore} not found`);
      }

      // Filter to get chats created before the selected chat
      query = query.lt('created_at', selectedChat.created_at);
    }

    // Execute the query
    const { data: filteredChats, error } = await query;

    if (error) {
      throw new Error(error.message);
    }

    const chats = filteredChats || [];
    const hasMore = chats.length > limit;

    return {
      chats: hasMore ? chats.slice(0, limit) : chats,
      hasMore,
    };
  } catch (error) {
    console.error('Failed to get chats by user from database');
    throw error;
  }
}

export async function getMaybeChatById({ id }: { id: string }) {
  try {
    const supabaseClient = await createSupabaseUserServerComponentClient();
    const {
      data: selectedChat,
      error: selectedChatError,
    } = await supabaseClient
      .from('workspace_chats')
      .select()
      .eq('id', id)
      .single();

    if (selectedChatError) {
      return null;
    }

    return selectedChat;
  } catch (error) {
    console.log(error);
    console.error('Failed to get chat by id from database');
    throw error;
  }
}

export async function getChatById({ id }: { id: string }) {
  try {
    const supabaseClient = await createSupabaseUserServerComponentClient();
    const {
      data: selectedChat,
      error: selectedChatError,
    } = await supabaseClient
      .from('workspace_chats')
      .select()
      .eq('id', id)
      .single();

    if (selectedChatError) {
      throw new Error(selectedChatError.message);
    }

    return selectedChat;
  } catch (error) {
    console.log(error);
    console.error('Failed to get chat by id from database');
    throw error;
  }
}

export async function saveMessages({
  messages,
}: {
  messages: Array<WorkspaceChatMessage>;
}) {
  try {
    const supabaseClient = await createSupabaseUserServerComponentClient();
    const {
      data: messagesData,
      error: messagesError,
    } = await supabaseClient
      .from('workspace_chat_messages')
      .insert(messages);

    if (messagesError) {
      throw new Error(messagesError.message);
    }

    return messagesData;
  } catch (error) {
    console.error('Failed to save messages in database', error);
    throw error;
  }
}

export async function getMessagesByChatId({ id }: { id: string }) {
  try {
    const supabaseClient = await createSupabaseUserServerComponentClient();
    const {
      data: messages,
      error: messagesError,
    } = await supabaseClient
      .from('workspace_chat_messages')
      .select()
      .eq('chat_id', id)
      .order('created_at', { ascending: true });

    if (messagesError) {
      throw new Error(messagesError.message);
    }

    return messages;
  } catch (error) {
    console.error('Failed to get messages by chat id from database', error);
    throw error;
  }
}

export async function voteMessage({
  chatId,
  messageId,
  type,
}: {
  chatId: string;
  messageId: string;
  type: 'up' | 'down';
}) {
  try {
    const user = await serverGetLoggedInUser();


    const supabaseClient = await createSupabaseUserServerComponentClient();
    const {
      data: existingVote,
      error: existingVoteError,
    } = await supabaseClient
      .from('workspace_chat_votes')
      .select('*')
      .eq('message_id', messageId)
      .eq('chat_id', chatId)
      .eq('user_id', user.id);

    if (existingVote) {
      return await supabaseClient
        .from('workspace_chat_votes')
        .update({ is_upvoted: type === 'up' })
        .eq('message_id', messageId)
        .eq('chat_id', chatId);
    }
    return await supabaseClient
      .from('workspace_chat_votes')
      .insert({
        user_id: user.id,
        chat_id: chatId,
        message_id: messageId,
        is_upvoted: type === 'up',
      });
  } catch (error) {
    console.error('Failed to upvote message in database', error);
    throw error;
  }
}

export async function getVotesByChatId({ id }: { id: string }) {
  try {
    const supabaseClient = await createSupabaseUserServerComponentClient();
    const {
      data: votes,
      error: votesError,
    } = await supabaseClient
      .from('workspace_chat_votes')
      .select('*')
      .eq('chat_id', id);

    if (votesError) {
      throw new Error(votesError.message);
    }

    return votes;
  } catch (error) {
    console.error('Failed to get votes by chat id from database', error);
    throw error;
  }
}

export async function saveDocument({
  id,
  title,
  kind,
  content,
  workspaceId,
}: {
  id: string;
  title: string;
  kind: ArtifactKind;
  content: string;
  workspaceId: string;
}) {
  try {
    const supabaseClient = await createSupabaseUserServerComponentClient();
    const {
      data: documentData,
      error: documentError,
    } = await supabaseClient
      .from('workspace_documents')
      .insert({
        id,
        title,
        kind,
        content,
        created_at: (new Date()).toISOString(),
        workspace_id: workspaceId,
      })
      .select('*');

    if (documentError) {
      throw new Error(documentError.message);
    }

    return documentData;
  } catch (error) {
    console.error('Failed to save document in database');
    throw error;
  }
}

export async function getDocumentsById({ id }: { id: string }) {
  try {
    const supabaseClient = await createSupabaseUserServerComponentClient();
    const {
      data: documents,
      error: documentsError,
    } = await supabaseClient
      .from('workspace_documents')
      .select('*')
      .eq('id', id)
      .order('created_at', { ascending: false });

    if (documentsError) {
      throw new Error(documentsError.message);
    }

    return documents;
  } catch (error) {
    console.error('Failed to get document by id from database');
    throw error;
  }
}

export async function getDocumentById({ id }: { id: string }) {
  try {
    const supabaseClient = await createSupabaseUserServerComponentClient();
    const {
      data: selectedDocument,
      error: selectedDocumentError,
    } = await supabaseClient
      .from('workspace_documents')
      .select('*')
      .eq('id', id)
      .order('created_at', { ascending: false })
      .single();

    if (selectedDocumentError) {
      throw new Error(selectedDocumentError.message);
    }

    return selectedDocument;
  } catch (error) {
    console.error('Failed to get document by id from database');
    throw error;
  }
}

export async function deleteDocumentsByIdAfterTimestamp({
  id,
  timestamp,
}: {
  id: string;
  timestamp: Date;
}) {
  try {
    const supabaseClient = await createSupabaseUserServerComponentClient();
    const {
      data: suggestionsToDelete,
      error: suggestionsToDeleteError,
    } = await supabaseClient
      .from('workspace_documents')
      .delete()
      .eq('id', id)
      .gt('created_at', timestamp);

    if (suggestionsToDeleteError) {
      throw new Error(suggestionsToDeleteError.message);
    }

    return suggestionsToDelete;
  } catch (error) {
    console.error(
      'Failed to delete documents by id after timestamp from database',
    );
    throw error;
  }
}

export async function saveSuggestions({
  suggestions,
}: {
  suggestions: Array<WorkspaceDocumentSuggestion>;
}) {
  try {
    const supabaseClient = await createSupabaseUserServerComponentClient();
    const {
      data: suggestionsData,
      error: suggestionsError,
    } = await supabaseClient
      .from('workspace_document_suggestions')
      .insert(suggestions);

    if (suggestionsError) {
      throw new Error(suggestionsError.message);
    }

    return suggestionsData;
  } catch (error) {
    console.error('Failed to save suggestions in database');
    throw error;
  }
}

export async function getSuggestionsByDocumentId({
  documentId,
}: {
  documentId: string;
}) {
  try {
    const supabaseClient = await createSupabaseUserServerComponentClient();
    const {
      data: suggestions,
      error: suggestionsError,
    } = await supabaseClient
      .from('workspace_document_suggestions')
      .select('*')
      .eq('document_id', documentId);

    if (suggestionsError) {
      throw new Error(suggestionsError.message);
    }

    return suggestions;
  } catch (error) {
    console.error(
      'Failed to get suggestions by document version from database',
    );
    throw error;
  }
}

export async function getMessageById({ id }: { id: string }) {
  try {
    const supabaseClient = await createSupabaseUserServerComponentClient();
    const {
      data: message,
      error: messageError,
    } = await supabaseClient
      .from('workspace_chat_messages')
      .select('*')
      .eq('id', id);

    if (messageError) {
      throw new Error(messageError.message);
    }

    return message;
  } catch (error) {
    console.error('Failed to get message by id from database');
    throw error;
  }
}

export async function deleteMessagesByChatIdAfterTimestamp({
  chatId,
  timestamp,
}: {
  chatId: string;
  timestamp: Date;
}) {
  try {
    const supabaseClient = await createSupabaseUserServerComponentClient();
    const {
      data: messagesToDelete,
      error: messagesToDeleteError,
    } = await supabaseClient
      .from('workspace_chat_messages')
      .select('id')
      .eq('chat_id', chatId)
      .gte('created_at', timestamp.toISOString());

    if (messagesToDeleteError) {
      throw new Error(messagesToDeleteError.message);
    }

    const messageIds = messagesToDelete.map((message) => message.id);

    if (messageIds.length > 0) {
      await supabaseClient
        .from('workspace_chat_messages')
        .delete()
        .in('id', messageIds);
    }
  } catch (error) {
    console.error(
      'Failed to delete messages by id after timestamp from database',
    );
    throw error;
  }
}


export async function deleteTrailingMessages({ id }: { id: string }) {
  const [message] = await getMessageById({ id });

  await deleteMessagesByChatIdAfterTimestamp({
    chatId: message.chat_id,
    timestamp: new Date(message.created_at),
  });
}

export async function generateTitleFromUserMessage({
  message,
}: {
  message: Message;
}) {
  const { text: title } = await generateText({
    model: myProvider.languageModel('title-model'),
    system: `\n
    - you will generate a short title based on the first message a user begins a conversation with
    - ensure it is not more than 80 characters long
    - the title should be a summary of the user's message
    - do not use quotes or colons`,
    prompt: JSON.stringify(message),
  });

  return title;
}

