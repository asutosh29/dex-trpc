import { useChatSimulation } from "../../../hooks/useChatSimulation";
import { ChatEmptyState } from "./ChatEmptyState";
import { ChatInputArea } from "./ChatInputArea";
import { ChatMessageList } from "./ChatMessageList";

export function ChatArea() {
  const {
    input,
    setInput,
    messages,
    isStreaming,
    isReasoningStreaming,
    handleSubmit,
    handleSuggestionClick,
  } = useChatSimulation();
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
      <ChatInputArea
        input={input}
        setInput={setInput}
        onSubmit={handleSubmit}
      />
    </>
  );
}
