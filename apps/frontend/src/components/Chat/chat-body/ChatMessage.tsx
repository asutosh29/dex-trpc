import { useChatContext } from "../context/ChatProvider";
import { ChatEmptyState } from "./ChatEmptyState";
import { ChatMessageList } from "./ChatMessageList";

export function ChatMessage() {
  const { messages, isStreaming, isReasoningStreaming, handleSuggestionClick } =
    useChatContext();

  return (
    <>
      {messages.length === 0 && !isStreaming ? (
        <ChatEmptyState onSuggestionClick={handleSuggestionClick} />
      ) : (
        <ChatMessageList
          messages={messages}
          isStreaming={isStreaming}
          isReasoningStreaming={isReasoningStreaming}
        />
      )}
    </>
  );
}
