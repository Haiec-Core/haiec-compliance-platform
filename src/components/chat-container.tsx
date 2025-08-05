"use client";

import { useChat, type Message } from "ai/react";
import { nanoid } from "nanoid";
import { useAction } from "next-safe-action/hooks";
import { usePathname } from "next/navigation";
import React, { Fragment } from "react";
import { toast } from "sonner";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { upsertChatAction } from "@/data/user/chats";
import { cn } from "@/lib/utils";
import { ChatList } from "./chat-list";
import { ChatPanel } from "./chat-panel";
import { EmptyScreen } from "./empty-screen";

export interface ChatProps extends React.ComponentProps<"div"> {
  initialMessages?: Message[];
  id?: string;
  project: { id: string; slug: string; name: string };
}

export function ChatContainer({
  id,
  initialMessages,
  className,
  project,
}: ChatProps) {
  const pathname = usePathname();
  const toastRef = React.useRef<string | number | undefined>(undefined);

  const { execute: saveChat } = useAction(upsertChatAction, {
    onExecute: () => {
      toastRef.current = toast.loading("Saving chat...");
    },
    onSuccess: () => {
      toast.success("Chat saved successfully", { id: toastRef.current });
      toastRef.current = undefined;
    },
    onError: ({ error }) => {
      const errorMessage = error.serverError ?? "Failed to save chat";
      toast.error(errorMessage, { id: toastRef.current });
      toastRef.current = undefined;
    },
  });

  const { messages, append, reload, stop, isLoading, input, setInput } =
    useChat({
      initialMessages,
      id,
      body: { id },
      onFinish({ content }) {
        messages.push(
          {
            role: "user",
            content: input,
            id: nanoid(),
          },
          {
            role: "assistant",
            content,
            id: nanoid(),
          },
        );

        if (pathname === `/project/${project.slug}`) {
          const chatPath = `/project/${project.slug}/chats/${id}`;
          window.history.replaceState(null, "", chatPath);
        }

        saveChat({
          chatId: id ?? nanoid(),
          projectId: project.id,
          payload: messages,
        });
      },
      onResponse(response) {
        if (response.status === 401) {
          toast.error(response.statusText);
        }
      },
    });

  return (
    <Card
      className={cn(
        "flex flex-col h-[calc(100svh-240px)] md:h-[calc(100svh-200px)]",
        className,
      )}
    >
      <CardContent className="grow p-4 overflow-hidden relative h-[calc(100%-250px)]">
        {messages.length ? (
          <Fragment>
            <ChatList isLoading={isLoading} messages={messages} />
          </Fragment>
        ) : (
          <EmptyScreen setInput={setInput} />
        )}
      </CardContent>
      <CardFooter className="w-full">
        <ChatPanel
          id={id}
          isLoading={isLoading}
          stop={stop}
          append={append}
          projectSlug={project.slug}
          reload={reload}
          messages={messages}
          input={input}
          setInput={setInput}
        />
      </CardFooter>
    </Card>
  );
}
