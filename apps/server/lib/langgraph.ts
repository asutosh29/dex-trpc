import { Client } from "@langchain/langgraph-sdk";

export const langgraphClient = new Client({
  apiUrl: process.env.LANGGRAPH_API_URL || "http://localhost:2024",
});
