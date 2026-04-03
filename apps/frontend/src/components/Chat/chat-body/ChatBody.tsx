import { SidebarInset } from "@repo/ui/components/ui/sidebar";

import { ChatHeader } from "../chat-header/ChatHeader";
import { ChatArea } from "./ChatArea";

export default function ChatBody() {
  return (
    <SidebarInset className="bg-background relative flex h-full flex-1 flex-col overflow-hidden">
      {/* Header containing Sidebar trigger */}
      <ChatHeader />
      {/* Main Chat Area */}
      <ChatArea />
    </SidebarInset>
  );
}
