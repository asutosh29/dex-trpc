import ChatBody from "../../components/Chat/chat-body/ChatBody";
import { ChatSidebar } from "../../components/Chat/chat-sidebar/ChatSidebar";

export function Chat() {
  return (
    <>
      {/* Chat Sidebar */}
      <ChatSidebar />
      {/* Chat Area */}
      <ChatBody />
    </>
  );
}

export default Chat;
