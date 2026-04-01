import { createAgent } from "langchain";
import { fakerModel, moonShotLLM } from "../llms/llm";
import { SYSTEM_PROMPT } from "../prompts/SYSTEM_PROMPT";
import { weatherTool } from "../tools/weather";


export const agent = createAgent({
  model: moonShotLLM,
  description: "Simple React Agent with a weather tool",
  systemPrompt: SYSTEM_PROMPT,
  tools: [weatherTool],
});