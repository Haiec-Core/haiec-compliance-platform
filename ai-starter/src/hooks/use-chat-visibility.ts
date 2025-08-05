'use client';

import {
  getChatHistoryPaginationKey,
  type ChatHistory,
} from '@/components/sidebar-history';
import type { VisibilityType } from '@/components/visibility-selector';
import { updateChatVisibilityAction } from '@/data/user/chat';
import { useAction } from 'next-safe-action/hooks';
import { useMemo } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { unstable_serialize } from 'swr/infinite';

export function useChatVisibility({
  chatId,
  initialVisibility,
  workspaceId,
}: {
  chatId: string;
  initialVisibility: VisibilityType;
  workspaceId: string;
}) {
  const { mutate, cache } = useSWRConfig();
  const history: ChatHistory = cache.get(`/api/workspace/${workspaceId}/history`)?.data;

  const { data: localVisibility, mutate: setLocalVisibility } = useSWR(
    `${chatId}-visibility`,
    null,
    {
      fallbackData: initialVisibility,
    },
  );

  const { execute: updateChatVisibilityExecute } = useAction(updateChatVisibilityAction);

  const visibilityType = useMemo(() => {
    if (!history) return localVisibility;
    const chat = history.chats.find((chat) => chat.id === chatId);
    if (!chat) return 'private';
    return chat.visibility;
  }, [history, chatId, localVisibility]);

  const setVisibilityType = (updatedVisibilityType: VisibilityType) => {
    setLocalVisibility(updatedVisibilityType);
    mutate(unstable_serialize(getChatHistoryPaginationKey(workspaceId)));

    updateChatVisibilityExecute({
      chatId: chatId,
      visibility: updatedVisibilityType,
    });
  };

  return { visibilityType, setVisibilityType };
}
