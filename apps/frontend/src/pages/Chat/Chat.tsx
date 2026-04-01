import { ThreadPrimitive, ComposerPrimitive, MessagePrimitive } from "@assistant-ui/react";
import { Sidebar } from "../../components/Sidebar";
import { WelcomeScreen } from "../../components/WelcomeScreen";
import { ChatRuntimeProvider } from "../../components/ChatRuntimeProvider";

export function Chat() {
    return (
        //  TODO: Migrate into a component and use the provided componenets rather than using primitives
        <ChatRuntimeProvider>
            <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
                <Sidebar />
                <div className="flex-1 flex flex-col h-full relative">
                    <ThreadPrimitive.Root className="flex-1 flex flex-col overflow-hidden">
                        <ThreadPrimitive.Viewport className="flex-1 overflow-y-auto px-4 py-6">
                            <ThreadPrimitive.Empty>
                                <WelcomeScreen />
                            </ThreadPrimitive.Empty>
                            <ThreadPrimitive.Messages
                                components={{
                                    UserMessage: () => (
                                        <MessagePrimitive.Root className="flex justify-end mb-4">
                                            <div className="bg-primary text-primary-foreground rounded-2xl rounded-br-sm px-4 py-2.5 max-w-[70%]">
                                                <MessagePrimitive.Content />
                                            </div>
                                        </MessagePrimitive.Root>
                                    ),
                                    AssistantMessage: () => (
                                        <MessagePrimitive.Root className="flex justify-start mb-4">
                                            <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-2.5 max-w-[70%]">
                                                <MessagePrimitive.Content />
                                            </div>
                                        </MessagePrimitive.Root>
                                    ),
                                }}
                            />
                        </ThreadPrimitive.Viewport>

                        <div className="border-t bg-background p-4">
                            <ComposerPrimitive.Root className="flex items-end gap-2 max-w-3xl mx-auto">
                                <ComposerPrimitive.Input
                                    placeholder="Send a message..."
                                    className="flex-1 resize-none bg-muted rounded-xl px-4 py-3 text-sm outline-none min-h-[44px] max-h-[200px]"
                                />
                                <ComposerPrimitive.Send className="bg-primary text-primary-foreground rounded-lg px-4 py-2.5 font-medium hover:bg-primary/90 transition-colors disabled:opacity-50">
                                    Send
                                </ComposerPrimitive.Send>
                                <ThreadPrimitive.If running>
                                    <ComposerPrimitive.Cancel className="bg-destructive text-destructive-foreground rounded-lg px-4 py-2.5 font-medium hover:bg-destructive/90 transition-colors">
                                        Stop
                                    </ComposerPrimitive.Cancel>
                                </ThreadPrimitive.If>
                            </ComposerPrimitive.Root>
                        </div>
                    </ThreadPrimitive.Root>
                </div>
            </div>
        </ChatRuntimeProvider>
    );
}

export default Chat;