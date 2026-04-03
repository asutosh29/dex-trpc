import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

import { useStream } from "@langchain/langgraph-sdk/react";
import { useMutation } from "@tanstack/react-query";

import type { MockMessage } from "../components/Chat/chat-body/ChatMessageList";
import { useTRPC } from "../utils/trpc";

export function useAgentChat() {
  const [input, setInput] = useState("");
  const [optimisticMessages, setOptimisticMessages] = useState<MockMessage[]>(
    []
  );
  const [isInitializingRun, setIsInitializingRun] = useState(false);
  const [pendingUserText, setPendingUserText] = useState<string | null>(null);

  const navigate = useNavigate();
  const { threadId } = useParams();
  const trpc = useTRPC();

  const createThread = useMutation(trpc.agent.threads.create.mutationOptions());

  // With native LangGraph Server connection instead of the custom proxy
  const stream = useStream<{
    messages: {
      id: string;
      role: string;
      content: string | any[];
      type: string;
    }[];
  }>({
    apiUrl: "http://localhost:2024",
    assistantId: "agent",
    threadId: threadId,
  });

  // Map stream messages back to MockMessage format
  const streamMessages: MockMessage[] = (stream.messages || []).map(
    (msg: any) => {
      return {
        id: msg.id || Date.now().toString(),
        role:
          msg.type === "human" ||
          msg.role === "user" ||
          msg._getType?.() === "human"
            ? "user"
            : "assistant",
        content:
          typeof msg.content === "string"
            ? msg.content
            : JSON.stringify(msg.content),
        // We don't have reasoning extracted explicitly here unless it's in a specific field
      };
    }
  );

  const isStreamingRuntime =
    (stream as any).status === "inflight" ||
    isInitializingRun ||
    stream.isLoading;

  // TODO: this works for now but migrate to a sustainable solution.!
  const displayMessages = [...streamMessages];
  if (isStreamingRuntime || pendingUserText) {
    if (pendingUserText) {
      const alreadyNativelyLogged = streamMessages.some(
        (m) => m.role === "user" && m.content === pendingUserText
      );
      if (!alreadyNativelyLogged) {
        displayMessages.push({
          id: "optimistic-user",
          role: "user",
          content: pendingUserText,
        });
      }
    }

    const lastMsgNow = displayMessages[displayMessages.length - 1];
    if (!lastMsgNow || lastMsgNow.role === "user") {
      displayMessages.push({
        id: "optimistic-assistant",
        role: "assistant",
        content: "",
      });
    }
  }

  // Effect to clean up pending text once stream is finished
  useEffect(() => {
    if (!isStreamingRuntime) {
      setPendingUserText(null);
    }
  }, [isStreamingRuntime]);

  // Aggregate messages: start with stream, append optimistic ones if taking time
  const messages = threadId ? displayMessages : optimisticMessages;

  const location = useLocation();
  const initialSubmitLock = useRef(false);

  // If we navigated here with an initial message, trigger the stream once!
  useEffect(() => {
    if (
      threadId &&
      location.state?.initialMessage &&
      !initialSubmitLock.current
    ) {
      initialSubmitLock.current = true;
      const initMessage = location.state.initialMessage;

      // Fire off the stream!
      stream.submit({
        messages: [{ role: "user", content: initMessage }],
        threadId,
      } as any);

      // Clear the router state safely in the background
      navigate(`/chat/${threadId}`, { replace: true, state: {} });
    }
  }, [threadId, location.state, navigate, stream]);

  const handleSubmit = useCallback(
    async (message: any, event?: React.FormEvent) => {
      event?.preventDefault();
      const text = message.text || input;
      if (!text.trim()) return;

      setInput("");
      setPendingUserText(text);

      if (!threadId) {
        // --- NEW CHAT FLOW (NO THREAD ID YET) ---
        const userMsg: MockMessage = {
          id: Date.now().toString(),
          role: "user",
          content: text,
        };
        const assistantPlaceholder: MockMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "",
          reasoning: "",
        };
        setOptimisticMessages([userMsg, assistantPlaceholder]);
        setIsInitializingRun(true);

        try {
          const { threadId: newThreadId } = await createThread.mutateAsync();
          // Navigate and pass the message via state to trigger stream.submit on mount
          navigate(`/chat/${newThreadId}`, { state: { initialMessage: text } });
        } catch (error) {
          console.error("Failed to start chat run:", error);
          setIsInitializingRun(false);
        }
      } else {
        // --- EXISTING CHAT FLOW ---
        setIsInitializingRun(true);
        try {
          stream.submit({
            messages: [{ role: "user", content: text }],
            threadId,
          } as any);
        } catch (error) {
          console.error("Failed to run agent:", error);
        } finally {
          setIsInitializingRun(false);
        }
      }
    },
    [input, threadId, createThread, navigate, stream]
  );

  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      handleSubmit({ text: suggestion });
    },
    [handleSubmit]
  );

  return {
    input,
    setInput,
    messages,
    streamData: stream.messages, // Exposed the parsed native chunks for Debug Panel
    isStreaming: isStreamingRuntime,
    isReasoningStreaming: false,
    handleSubmit,
    handleSuggestionClick,
  };
}
