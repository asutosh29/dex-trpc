import { SidebarInset } from "@repo/ui/components/ui/sidebar";

import { ChatHeader } from "../chat-header/ChatHeader";
import { ChatProvider } from "../context/ChatProvider";
import { ChatArea } from "./ChatArea";

export default function ChatBody() {
  return (
    <SidebarInset className="bg-background relative flex h-full flex-1 flex-col overflow-hidden">
      <ChatProvider>
        <ChatHeader />
        <ChatArea />
      </ChatProvider>
    </SidebarInset>
  );
}
