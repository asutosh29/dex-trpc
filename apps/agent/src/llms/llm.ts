import { ChatGroq } from "@langchain/groq";
export const MOONSHOT_LLM = "moonshotai/kimi-k2-instruct-0905";
export const moonShotLLM = new ChatGroq({
  model: MOONSHOT_LLM,
});