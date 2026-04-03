import { trpcServer } from "@hono/trpc-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { streamSSE } from "hono/streaming";

import { langgraphClient } from "../lib/langgraph";
import { appRouter } from "./appRouter";

const app = new Hono();

app.use("/*", cors());
/*
Used when Custom Transport is configured in frontend...
*/
app.post("/api/chat/stream", async (c) => {
  const body = await c.req.json();
  console.log("STREAM PROXY: Received payload:", body);

  const threadId = body.threadId || body.thread_id;
  if (!threadId) {
    return c.json({ error: "threadId is required to persist messages." }, 400);
  }

  const assistantId = body.assistantId || body.assistant_id || "agent";

  const finalInput = body.input || body;
  let cleanInput: Record<string, any> = {};

  // TODO: Look for cleaner implementation
  if (finalInput.message && typeof finalInput.message === "string") {
    cleanInput = { messages: [{ role: "user", content: finalInput.message }] };
  } else if (typeof finalInput === "string") {
    cleanInput = { messages: [{ role: "user", content: finalInput }] };
  } else if (finalInput.messages) {
    cleanInput = { messages: finalInput.messages };
  } else {
    const {
      threadId: _t1,
      thread_id: _t2,
      assistantId: _a1,
      assistant_id: _a2,
      ...rest
    } = finalInput;
    cleanInput = rest;
  }

  // Notice: no auth injection yet, just forwarding the input securely
  const stream = await langgraphClient.runs.stream(threadId, assistantId, {
    input: cleanInput,
    streamMode: "updates",
  });

  return streamSSE(c, async (streamWriter) => {
    try {
      for await (const chunk of stream) {
        console.log("STREAM PROXY: Yielding chunk:", chunk.event);
        // We write the strict EventStream format the LangGraph React hook expects
        await streamWriter.writeSSE({
          event: chunk.event,
          data: JSON.stringify(chunk.data),
        });
      }
    } catch (e) {
      console.error("Stream Error", e);
    }
  });
});

app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
    endpoint: "/trpc",
  })
);

Bun.serve({
  port: 3000,
  fetch: app.fetch,
});

console.log("Server running on http://localhost:3000");
