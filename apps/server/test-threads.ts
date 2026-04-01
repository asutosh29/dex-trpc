import { agentService } from "./trpc/services/agent.service";

async function main() {
  try {
    const threads = await agentService.getThreads();
    console.log("Threads type:", Array.isArray(threads) ? "Array" : typeof threads);
    console.log("Threads value:", JSON.stringify(threads, null, 2).slice(0, 500));
  } catch (e) {
    console.error(e);
  }
}
main();
