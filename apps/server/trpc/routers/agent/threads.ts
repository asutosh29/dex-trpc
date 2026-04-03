import { langgraphClient } from "../../../lib/langgraph";
import { publicProcedure, router } from "../../trpc";

export const threadsRouter = router({
  create: publicProcedure.mutation(async () => {
    const thread = await langgraphClient.threads.create();
    return {
      threadId: thread.thread_id,
    };
  }),
});
