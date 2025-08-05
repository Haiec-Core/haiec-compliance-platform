"use client";
import type { Message } from "ai";

import { Fragment } from "react";
import { ChatMessage } from "./chat-message";
import { ChatScrollAnchor } from "./chat-scroll-anchor";
import { ScrollArea } from "./ui/scroll-area";

export interface ChatListProps {
  messages: Message[];
  isLoading: boolean;
}

export function ChatList({ messages, isLoading }: ChatListProps) {
  if (!messages.length) {
    return null;
  }

  return (
    <Fragment>
      <div className="absolute inset-0 overflow-hidden h-full">
        <ScrollArea className="h-full chat-scroll-area">
          <div className="space-y-6 py-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </div>
          <ChatScrollAnchor trackVisibility={isLoading} />
        </ScrollArea>
      </div>
    </Fragment>
  );
}
