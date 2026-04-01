import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { agentService } from "../services/agent.service";

export const agentThreadRouter = router({
  list: publicProcedure.query(async () => {
    return agentService.getThreads();
  }),
  create: publicProcedure.mutation(async () => {
    const thread = await agentService.createThread();
    return { id: thread.thread_id };
  }),
  getState: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return agentService.getThreadState(input.id);
    }),
  rename: publicProcedure
    .input(z.object({ id: z.string(), title: z.string() }))
    .mutation(async ({ input }) => {
      await agentService.renameThread(input.id, input.title);
      return { success: true };
    }),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      await agentService.deleteThread(input.id);
      return { success: true };
    }),
});

export const agentRunRouter = router({
  stream: publicProcedure
    .input(
      z.object({
        threadId: z.string(),
        messages: z.array(z.any()).optional(),
        command: z.any().optional(),
      })
    )
    .mutation(async function* ({ input }) {
      const stream = agentService.streamChat(
        input.threadId,
        input.messages ?? [],
        input.command
      );
      for await (const chunk of stream) {
        yield chunk;
      }
    }),
  interrupt: publicProcedure
    .input(z.object({ threadId: z.string(), runId: z.string() }))
    .mutation(async ({ input }) => {
      await agentService.interruptRun(input.threadId, input.runId);
      return { success: true };
    }),
});

export const agentRouter = router({
  thread: agentThreadRouter,
  run: agentRunRouter,
});
