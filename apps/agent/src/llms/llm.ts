import { fakeModel } from "langchain";
import { AIMessage } from "@langchain/core/messages";
import { ChatGroq } from "@langchain/groq";

export const FAME_LLM = "mock_llm";

export const fakerModel = fakeModel()
  .respond((messages: any[]) => {
    const lastMessage = messages[messages.length - 1];

    if (lastMessage && lastMessage._getType() === "tool") {
      return new AIMessage("The following tool was executed successfully.");
    }

    const content = typeof lastMessage?.content === "string" ? lastMessage.content.toLowerCase() : "";

    if (content.includes("weather") || content.includes("tool")) {
      return new AIMessage({
        content: "",
        tool_calls: [
          {
            name: "weather",
            args: { location: "demo" },
            id: "call_" + Math.random().toString(36).substring(7),
          },
        ],
      });
    }

    return new AIMessage("This is a demo message.\n\nHere is a small paragraph so that you can test the streaming UI. The text should appear incrementally. It simulates the delay of a real large language model generating tokens one by one.");
  });
export const MOONSHOT_LLM = "moonshotai/kimi-k2-instruct-0905"
export const moonShotLLM = new ChatGroq({
  model: MOONSHOT_LLM,
});