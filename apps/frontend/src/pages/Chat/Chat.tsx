import { useEffect, useRef, useState } from "react";

import { SidebarInset, SidebarProvider } from "@repo/ui/components/ui/sidebar";

import { ChatEmptyState } from "../../components/ChatEmptyState";
import { ChatInputArea } from "../../components/ChatInputArea";
import {
  ChatMessageList,
  type MockMessage,
} from "../../components/ChatMessageList";
import { ChatSidebar } from "../../components/ChatSidebar";

export function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<MockMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat when new messages arrive or isThinking changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  const handleSubmit = (message: any, event?: React.FormEvent) => {
    event?.preventDefault();
    const text = message.text || input;
    if (!text.trim()) return;

    // Add user message
    const newMessage: MockMessage = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsThinking(true);

    // Simulate async assistant response after 1.5s thinking
    setTimeout(() => {
      setIsThinking(false);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: `This is a mock response to: "${text}"`,
        },
      ]);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSubmit({ text: suggestion });
  };

  return (
    <SidebarProvider className="h-screen overflow-hidden bg-[#0A0A0A] font-sans text-white">
      <ChatSidebar />

      {/* Main Chat Area */}
      <SidebarInset className="relative flex h-full flex-1 flex-col bg-[#0A0A0A]">
        {messages.length === 0 && !isThinking ? (
          <ChatEmptyState onSuggestionClick={handleSuggestionClick} />
        ) : (
          <ChatMessageList
            messages={messages}
            isThinking={isThinking}
            scrollRef={scrollRef}
          />
        )}

        <ChatInputArea
          input={input}
          setInput={setInput}
          onSubmit={handleSubmit}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Chat;
