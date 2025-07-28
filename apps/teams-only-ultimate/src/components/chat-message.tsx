import type { Message } from "ai";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { ChatMessageActions } from "@/components/chat-message-actions";
import { MemoizedReactMarkdown } from "@/components/markdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";
import { CodeBlock } from "./ui/codeblock";

export interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message, ...props }: ChatMessageProps) {
  return (
    <div
      className={cn(
        "flex items-end",
        message.role === "user" ? "justify-end" : "justify-start",
      )}
      {...props}
    >
      {message.role !== "user" && (
        <Avatar className="w-8 h-8 mr-2">
          <AvatarFallback>
            <Bot className="h-4 w-4" />
          </AvatarFallback>
          <AvatarImage src="/assistant-avatar.png" />
        </Avatar>
      )}
      <Card
        className={cn(
          "max-w-[80%] overflow-hidden",
          message.role === "user" ? "" : "bg-muted",
        )}
      >
        <CardContent className="p-3">
          <div className="wyiswyg dark:wysiwyg-invert">
            <MemoizedReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              components={{
                p({ children }) {
                  return <p className="mb-2 last:mb-0">{children}</p>;
                },
                code({ node, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");

                  return (
                    <CodeBlock
                      key={Math.random()}
                      language={match?.[1] || ""}
                      value={String(children).replace(/\n$/, "")}
                      {...props}
                    />
                  );
                },
              }}
            >
              {message.content}
            </MemoizedReactMarkdown>
          </div>
        </CardContent>
      </Card>
      {message.role === "user" && (
        <Avatar className="w-8 h-8 ml-2">
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
          <AvatarImage src="/user-avatar.png" />
        </Avatar>
      )}
      <div className="relative">
        <ChatMessageActions message={message} />
      </div>
    </div>
  );
}
