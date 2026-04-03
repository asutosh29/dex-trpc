import { useCallback, useState } from "react";

import type { MockMessage } from "../components/Chat/chat-body/ChatMessageList";

// --- Mock Response Generators ---

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function* streamGenericResponse(
  query: string
): AsyncGenerator<{ type: "text"; content: string }> {
  const lines = [
    `Here's my response to your question about "${query}".`,
    "\n\nI've analyzed the information available and here are my thoughts:",
    "\n\n- First, this is a comprehensive overview of the topic.",
    "\n- Second, there are multiple perspectives to consider.",
    "\n- Third, the context matters significantly.",
    "\n\nLet me know if you'd like me to elaborate on any of these points!",
  ];
  for (const line of lines) {
    await delay(80);
    yield { type: "text", content: line };
  }
}

async function* streamWeatherResponse(): AsyncGenerator<{
  type: "text" | "reasoning";
  content: string;
}> {
  // Reasoning phase
  const thoughts = [
    "The user is asking about weather.",
    " I need to provide a forecast-style response.",
    " Let me simulate current conditions and a multi-day outlook.",
    " I'll format this nicely with temperatures and conditions.",
  ];
  for (const t of thoughts) {
    await delay(100);
    yield { type: "reasoning", content: t };
  }
  await delay(400);

  // Final response
  const lines = [
    "## ☀️ Current Weather\n\n",
    "**San Francisco, CA** — 68°F (20°C)\n",
    "Partly cloudy with light winds from the west at 12 mph.\n\n",
    "### 5-Day Forecast\n\n",
    "| Day       | High | Low  | Condition       |\n",
    "|-----------|------|------|----------------|\n",
    "| Monday    | 70°F | 55°F | ☀️ Sunny        |\n",
    "| Tuesday   | 68°F | 54°F | ⛅ Partly Cloudy |\n",
    "| Wednesday | 65°F | 52°F | 🌧️ Light Rain   |\n",
    "| Thursday  | 63°F | 50°F | 🌧️ Showers      |\n",
    "| Friday    | 67°F | 53°F | ☀️ Clear         |\n",
  ];
  for (const line of lines) {
    await delay(60);
    yield { type: "text", content: line };
  }
}

async function* streamTableResponse(): AsyncGenerator<{
  type: "text";
  content: string;
}> {
  const lines = [
    "Here's a comparison of popular frontend frameworks:\n\n",
    "| Framework   | Language   | Stars  | Bundle Size | Learning Curve |\n",
    "|-------------|-----------|--------|-------------|----------------|\n",
    "| React       | JSX/TSX   | 225k   | ~42kb       | Moderate       |\n",
    "| Vue         | SFC       | 207k   | ~33kb       | Easy           |\n",
    "| Svelte      | Svelte    | 78k    | ~1.6kb      | Easy           |\n",
    "| Angular     | TypeScript| 95k    | ~143kb      | Steep          |\n",
    "| Solid       | JSX/TSX   | 32k    | ~7kb        | Moderate       |\n",
    "\n\n> **Note:** Bundle sizes are approximate and vary based on configuration.",
  ];
  for (const line of lines) {
    await delay(70);
    yield { type: "text", content: line };
  }
}

async function* streamThinkingResponse(
  query: string
): AsyncGenerator<{ type: "text" | "reasoning"; content: string }> {
  // Extended reasoning phase
  const thoughts = [
    "Let me analyze this step by step.",
    " First, I need to understand what the user is really asking.",
    ` The query "${query}" suggests they want a detailed, well-reasoned answer.`,
    " I should break this down into components.",
    " Let me consider multiple angles before forming my response.",
    " I should also think about edge cases and potential follow-up questions.",
    " Now I have a clear picture. Let me compose a thorough answer.",
  ];
  for (const t of thoughts) {
    await delay(150);
    yield { type: "reasoning", content: t };
  }
  await delay(500);

  // Final response
  const response = [
    "After careful consideration, here's my analysis:\n\n",
    "### Key Insights\n\n",
    "1. **Understanding the Core Issue** — The fundamental aspect here requires careful examination of the underlying principles.\n\n",
    "2. **Multiple Perspectives** — There are several valid approaches, each with distinct trade-offs.\n\n",
    "3. **Recommended Approach** — Based on the analysis, the most balanced solution would be to combine practical implementation with theoretical best practices.\n\n",
    "Would you like me to dive deeper into any of these points?",
  ];
  for (const line of response) {
    await delay(80);
    yield { type: "text", content: line };
  }
}

function getResponseGenerator(query: string) {
  const q = query.toLowerCase();
  if (q.includes("weather")) return streamWeatherResponse();
  if (q.includes("table")) return streamTableResponse();
  if (q.includes("think") || q.includes("reason"))
    return streamThinkingResponse(query);
  return streamGenericResponse(query);
}

// --- Hook ---

export function useChatSimulation() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<MockMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isReasoningStreaming, setIsReasoningStreaming] = useState(false);

  const handleSubmit = useCallback(
    async (message: any, event?: React.FormEvent) => {
      event?.preventDefault();
      const text = message.text || input;
      if (!text.trim()) return;

      // Add user message
      const userMsg: MockMessage = {
        id: Date.now().toString(),
        role: "user",
        content: text,
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");

      // Create assistant message placeholder
      const assistantId = (Date.now() + 1).toString();
      const assistantMsg: MockMessage = {
        id: assistantId,
        role: "assistant",
        content: "",
        reasoning: "",
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsStreaming(true);

      // Stream the response using async generators
      const generator = getResponseGenerator(text);
      let currentReasoning = "";
      let currentContent = "";
      let reasoningDone = false;

      for await (const chunk of generator) {
        if (chunk.type === "reasoning") {
          currentReasoning += chunk.content;
          setIsReasoningStreaming(true);
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, reasoning: currentReasoning } : m
            )
          );
        } else {
          if (!reasoningDone && currentReasoning) {
            setIsReasoningStreaming(false);
            reasoningDone = true;
          }
          currentContent += chunk.content;
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, content: currentContent } : m
            )
          );
        }
      }

      setIsReasoningStreaming(false);
      setIsStreaming(false);
    },
    [input]
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
    isStreaming,
    isReasoningStreaming,
    handleSubmit,
    handleSuggestionClick,
  };
}
