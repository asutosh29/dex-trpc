import { useState } from "react";

import type { MockMessage } from "../components/ChatMessageList";

// TODO: In Phase 5/Integration, swap this hook's internals to use tRPC and LangGraph
export function useChatSimulation() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<MockMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);

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

  return {
    input,
    setInput,
    messages,
    isThinking,
    handleSubmit,
    handleSuggestionClick,
  };
}
