import { useEffect, useRef } from "react";

import { SidebarInset, SidebarTrigger } from "@repo/ui/components/ui/sidebar";

import { ChatEmptyState } from "../../components/ChatEmptyState";
import { ChatInputArea } from "../../components/ChatInputArea";
import { ChatMessageList } from "../../components/ChatMessageList";
import { ChatSidebar } from "../../components/ChatSidebar";
import { useChatSimulation } from "../../hooks/useChatSimulation";

export function Chat() {
  const {
    input,
    setInput,
    messages,
    isStreaming,
    isReasoningStreaming,
    handleSubmit,
    handleSuggestionClick,
  } = useChatSimulation();

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat when new messages arrive or streaming changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isStreaming]);

  return (
    <>
      <ChatSidebar />

      {/* Main Chat Area */}
      <SidebarInset className="bg-background relative flex h-full flex-1 flex-col overflow-hidden">
        {/* Header containing Sidebar trigger */}
        <header className="flex h-14 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
        </header>

        {messages.length === 0 && !isStreaming ? (
          <ChatEmptyState onSuggestionClick={handleSuggestionClick} />
        ) : (
          <ChatMessageList
            messages={messages}
            isStreaming={isStreaming}
            isReasoningStreaming={isReasoningStreaming}
            scrollRef={scrollRef}
          />
        )}

        <ChatInputArea
          input={input}
          setInput={setInput}
          onSubmit={handleSubmit}
        />
      </SidebarInset>
    </>
  );
}

export default Chat;
