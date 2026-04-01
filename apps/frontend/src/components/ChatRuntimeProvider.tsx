import { type ReactNode, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useLangGraphRuntime } from "@assistant-ui/react-langgraph";
import { trpcClient } from "../lib/trpc";
import { WeatherToolUI } from "./tools/WeatherToolUI";

export function ChatRuntimeProvider({ children }: { children: ReactNode }) {
  const { threadId } = useParams();
  const navigate = useNavigate();

  const threadListAdapter = useMemo(() => ({
    async list() {
      const threads = await trpcClient.agent.thread.list.query();
      return {
        threads: threads.map((t: any) => ({
          id: t.thread_id,
          externalId: t.thread_id,
          status: "regular" as const,
          title: t.metadata?.title || "New Thread",
        })),
      };
    },
    async fetch(id: string) {
      return { id, externalId: id, status: "regular" as const, title: "Chat" };
    },
    async delete(id: string) {
      await trpcClient.agent.thread.delete.mutate({ id });
      if (threadId === id) navigate("/chat", { replace: true });
    },
    async rename(id: string, newTitle: string) {
      await trpcClient.agent.thread.rename.mutate({ id, title: newTitle });
    }
  }), [threadId, navigate]);

  const runtime = useLangGraphRuntime({
    adapters: { threadList: threadListAdapter } as any,
    stream: async function* (messages, { initialize, command }) {
      const { externalId } = await initialize();
      if (!externalId) throw new Error("Thread not initialized");

      navigate(`/chat/${externalId}`, { replace: true });

      // Proxy the stream through the tRPC backend → LangGraph
      const stream = await trpcClient.agent.run.stream.mutate({
        threadId: externalId,
        messages,
        command,
      });

      if (Symbol.asyncIterator in Object(stream)) {
        for await (const chunk of stream as AsyncIterable<any>) {
          yield chunk;
        }
      }
    },

    create: async () => {
      const result = await trpcClient.agent.thread.create.mutate();
      navigate(`/chat/${result.id}`, { replace: true });
      return { externalId: result.id };
    },

    load: async (externalId: string) => {
      navigate(`/chat/${externalId}`, { replace: true });
      const state = await trpcClient.agent.thread.getState.query({
        id: externalId,
      });
      return {
        messages: (state.values as any)?.messages ?? [],
        interrupts: (state.tasks?.[0] as any)?.interrupts,
      };
    },

    delete: async (externalId: string) => {
      await trpcClient.agent.thread.delete.mutate({ id: externalId });
      navigate("/chat", { replace: true });
    },
  });

  useEffect(() => {
    if (threadId) {
      runtime.threads?.switchToThread(threadId);
    } else {
      runtime.threads?.switchToNewThread();
    }
  }, [threadId, runtime]);

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <WeatherToolUI />
      {children}
    </AssistantRuntimeProvider>
  );
}
