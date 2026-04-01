import { Client } from "@langchain/langgraph-sdk";
import {config} from "dotenv"
config()

export class AgentService {
  private client: Client;
  private assistantId: string;

  constructor(apiUrl: string, assistantId: string) {
    this.client = new Client({ apiUrl });
    this.assistantId = assistantId;
  }

  async getThreads() {
    return this.client.threads.search({ limit: 50 });
  }

  async createThread() {
    return this.client.threads.create();
  }

  async renameThread(threadId: string, title: string) {
    return this.client.threads.update(threadId, { metadata: { title } });
  }

  async deleteThread(threadId: string) {
    return this.client.threads.delete(threadId);
  }

  async getThreadState(threadId: string) {
    return this.client.threads.getState(threadId);
  }

  async *streamChat(threadId: string, messages: any[], command?: any) {
    const stream = this.client.runs.stream(threadId, this.assistantId, {
      input: messages?.length ? { messages } : null,
      command,
      streamMode: ["messages-tuple", "updates"],
    });


    //  TODO: Think of a better solution!
    for await (const chunk of stream) {
      // Filter out events the assistant-ui runtime doesn't handle
      if ((chunk as any)?.event === "messages/metadata") continue;
      yield chunk;
    }
  }

  async interruptRun(threadId: string, runId: string) {
    return this.client.runs.cancel(threadId, runId);
  }
}

export const agentService = new AgentService(
  process.env.LANGGRAPH_API_URL || "http://localhost:2024",
  process.env.LANGGRAPH_ASSISTANT_ID || "agent"
);
