import React, { useEffect, useRef } from "react";

import { Copy, Sparkles, ThumbsDown, ThumbsUp } from "lucide-react";

import {
  Message,
  MessageAction,
  MessageActions,
  MessageContent,
  MessageResponse,
  MessageToolbar,
} from "@repo/ui/components/ai-elements/message";
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "@repo/ui/components/ai-elements/reasoning";

export type Role = "user" | "assistant";
export type MockMessage = {
  id: string;
  role: Role;
  content: string;
  reasoning?: string;
};

const MemoizedMessageItem = React.memo(
  ({
    msg,
    isLastMessage,
    isStreaming,
    isReasoningStreaming,
  }: {
    msg: MockMessage;
    isLastMessage: boolean;
    isStreaming: boolean;
    isReasoningStreaming: boolean;
  }) => {
    return (
      <div className="flex w-full">
        <Message from={msg.role} className="w-full">
          <div className="flex gap-4">
            {msg.role === "assistant" ? (
              <div className="border-border bg-accent mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border shadow-sm">
                <Sparkles className="text-muted-foreground h-4 w-4 fill-current" />
              </div>
            ) : null}
            <div
              className={`flex-1 ${msg.role === "user" ? "flex justify-end" : ""}`}
            >
              {/* Reasoning Block */}
              {msg.role === "assistant" && msg.reasoning && (
                <Reasoning
                  className="mb-4 w-full"
                  isStreaming={isLastMessage && isReasoningStreaming}
                >
                  <ReasoningTrigger />
                  <ReasoningContent>{msg.reasoning}</ReasoningContent>
                </Reasoning>
              )}

              {/* Message Content */}
              {(msg.content || !isLastMessage || !isStreaming) && (
                <MessageContent
                  className={`inline-block ${
                    msg.role === "user"
                      ? "bg-secondary text-secondary-foreground rounded-3xl px-5 py-3"
                      : ""
                  }`}
                >
                  <MessageResponse className="text-[15px] leading-relaxed">
                    {msg.content}
                  </MessageResponse>
                </MessageContent>
              )}

              {/* Streaming indicator for current message */}
              {msg.role === "assistant" &&
                isLastMessage &&
                isStreaming &&
                !msg.content &&
                !isReasoningStreaming && (
                  <div className="flex h-9 items-center">
                    <span className="text-muted-foreground animate-pulse font-medium">
                      Thinking...
                    </span>
                  </div>
                )}

              {/* Actions for Assistant */}
              {msg.role === "assistant" &&
                msg.content &&
                !(isLastMessage && isStreaming) && (
                  <MessageToolbar className="mt-2">
                    <MessageActions>
                      <MessageAction tooltip="Copy message">
                        <Copy className="text-muted-foreground h-4 w-4" />
                      </MessageAction>
                      <MessageAction tooltip="Helpful">
                        <ThumbsUp className="text-muted-foreground h-4 w-4" />
                      </MessageAction>
                      <MessageAction tooltip="Not helpful">
                        <ThumbsDown className="text-muted-foreground h-4 w-4" />
                      </MessageAction>
                    </MessageActions>
                  </MessageToolbar>
                )}
            </div>
          </div>
        </Message>
      </div>
    );
  },
  (prev, next) => {
    // Explicit value equality check to prevent new object references
    // calculated upstream from breaking component memoization.
    return (
      prev.msg.id === next.msg.id &&
      prev.msg.content === next.msg.content &&
      prev.msg.role === next.msg.role &&
      prev.msg.reasoning === next.msg.reasoning &&
      prev.isLastMessage === next.isLastMessage &&
      prev.isStreaming === next.isStreaming &&
      prev.isReasoningStreaming === next.isReasoningStreaming
    );
  }
);

export function ChatMessageList({
  messages,
  isStreaming,
  isReasoningStreaming,
}: {
  messages: MockMessage[];
  isStreaming: boolean;
  isReasoningStreaming: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat when new messages arrive or streaming changes
  useEffect(() => {
    // requestAnimationFrame ensures the DOM has fully reflowed the new text blocks
    // before we attempt to calculate the scroll placement layout.
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    });
  }, [messages, isStreaming]);

  return (
    <div
      ref={scrollRef}
      className="relative flex-1 overflow-y-auto scroll-smooth px-4 py-8"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        {messages.map((msg, index) => {
          const isLastMessage = index === messages.length - 1;

          return (
            <MemoizedMessageItem
              key={msg.id}
              msg={msg}
              isLastMessage={isLastMessage}
              isStreaming={isStreaming}
              isReasoningStreaming={isReasoningStreaming}
            />
          );
        })}
        {/* Invisible anchor element to trace bottom bounds without excessive spacing */}
        <div ref={messagesEndRef} className="h-6 w-full shrink-0" />
      </div>
    </div>
  );
}
