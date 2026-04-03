import { createContext, type ReactNode, useContext } from "react";

import { useChatSimulation } from "../../../hooks/useChatSimulation";

type ChatContextValue = ReturnType<typeof useChatSimulation>;

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const chat = useChatSimulation();
  return <ChatContext.Provider value={chat}>{children}</ChatContext.Provider>;
}

export function useChatContext(): ChatContextValue {
  const ctx = useContext(ChatContext);
  if (!ctx) {
    throw new Error("useChatContext must be used within a <ChatProvider>");
  }
  return ctx;
}
