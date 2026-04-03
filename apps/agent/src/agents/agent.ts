import { Annotation, messagesStateReducer } from "@langchain/langgraph";
import { config } from "dotenv";
import { BaseMessage, createAgent } from "langchain";
import z from "zod";

import { moonShotLLM } from "../llms/llm";
import { SYSTEM_PROMPT } from "../prompts/SYSTEM_PROMPT";
import { weatherTool } from "../tools/weather";

config({
  path: "../../.env",
});

const CustomAgentState = Annotation.Root({
  messages: Annotation<BaseMessage[]>({
    reducer: messagesStateReducer,
    default: () => [],
  }),
});
export const agent = createAgent({
  model: moonShotLLM,
  description: "Simple React Agent with a weather tool",
  systemPrompt: SYSTEM_PROMPT,
  tools: [weatherTool],
  stateSchema: CustomAgentState,
});

export type AgentState = typeof CustomAgentState.State;
