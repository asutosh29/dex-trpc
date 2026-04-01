import type { RefObject } from "react";

import { Copy, Sparkles, ThumbsDown, ThumbsUp } from "lucide-react";

import {
  Message,
  MessageAction,
  MessageActions,
  MessageContent,
  MessageResponse,
  MessageToolbar,
} from "@repo/ui/components/ai-elements/message";

export type Role = "user" | "assistant";
export type MockMessage = { id: string; role: Role; content: string };

export function ChatMessageList({
  messages,
  isThinking,
  scrollRef,
}: {
  messages: MockMessage[];
  isThinking: boolean;
  scrollRef: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        {messages.map((msg) => (
          <div key={msg.id} className="flex w-full">
            <Message from={msg.role} className="w-full">
              <div className="flex gap-4">
                {msg.role === "assistant" ? (
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[#333] bg-[#1A1A1A]">
                    <Sparkles className="h-4 w-4 fill-current text-gray-300" />
                  </div>
                ) : null}
                <div
                  className={`flex-1 ${msg.role === "user" ? "flex justify-end" : ""}`}
                >
                  <MessageContent
                    className={`inline-block ${
                      msg.role === "user"
                        ? "rounded-3xl bg-[#222] px-5 py-3 text-white"
                        : ""
                    }`}
                  >
                    <MessageResponse>{msg.content}</MessageResponse>
                  </MessageContent>

                  {/* Actions for Assistant */}
                  {msg.role === "assistant" && (
                    <MessageToolbar className="mt-2">
                      <MessageActions>
                        <MessageAction tooltip="Copy message">
                          <Copy className="h-4 w-4 text-gray-400" />
                        </MessageAction>
                        <MessageAction tooltip="Helpful">
                          <ThumbsUp className="h-4 w-4 text-gray-400" />
                        </MessageAction>
                        <MessageAction tooltip="Not helpful">
                          <ThumbsDown className="h-4 w-4 text-gray-400" />
                        </MessageAction>
                      </MessageActions>
                    </MessageToolbar>
                  )}
                </div>
              </div>
            </Message>
          </div>
        ))}

        {/* Thinking Shimmer */}
        {isThinking && (
          <div className="flex w-full">
            <Message from="assistant" className="w-full">
              <div className="flex gap-4">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[#333] bg-[#1A1A1A]">
                  <Sparkles className="h-4 w-4 fill-current text-gray-300" />
                </div>
                <div className="flex flex-1 items-center">
                  <span className="animate-pulse font-medium text-gray-400">
                    Thinking...
                  </span>
                </div>
              </div>
            </Message>
          </div>
        )}
      </div>
    </div>
  );
}
