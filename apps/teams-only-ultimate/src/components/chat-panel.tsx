import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { UseChatHelpers } from "ai/react";
import { RefreshCw, Send, StopCircle } from "lucide-react";
import React from "react";

export interface ChatPanelProps
  extends Pick<
    UseChatHelpers,
    | "append"
    | "isLoading"
    | "reload"
    | "messages"
    | "stop"
    | "input"
    | "setInput"
  > {
  id?: string;
  projectSlug: string;
}

export function ChatPanel({
  id,
  isLoading,
  stop,
  append,
  reload,
  input,
  setInput,
  messages,
  projectSlug,
}: ChatPanelProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      await append({
        id,
        content: input,
        role: "user",
      });
      setInput("");
    }
  };

  return (
    <div className="border-t pt-4 mt-4 w-full">
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="grow"
        />
        <Button type="submit" disabled={isLoading || !input.trim()}>
          <Send className="w-4 h-4 mr-2" />
          Send
        </Button>
        <Button
          variant="outline"
          onClick={() => reload()}
          disabled={isLoading || messages.length === 0}
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          <span className="hidden md:inline">Regenerate</span>
        </Button>
        {isLoading && (
          <Button variant="destructive" onClick={() => stop()}>
            <StopCircle className="w-4 h-4 mr-2" />
            <span className="hidden md:inline">Stop</span>
          </Button>
        )}
      </form>
    </div>
  );
}
