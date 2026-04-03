import { z } from "zod";

import { langgraphClient } from "../../../lib/langgraph";
import { publicProcedure, router } from "../../trpc";

export const runsRouter = router({
  create: publicProcedure
    .input(
      z.object({
        threadId: z.string(),
        assistantId: z.string().default("agent"),
        message: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      // NOTE: Using wait for run to start/resolve here so frontend can redirect safely
      // However, useStream expects the stream. For now we just kick off create().
      // Wait, let's just trigger a run, so useStream can pick it up or we can just let useStream handle everything.
      // Wait, in LangGraph, `useStream` usually handles sending the input message itself!
      // If we call `useStream` and just call its `submit(message)` function, it will create the run.
      // Let's implement this mutation anyway in case we want to manually trigger runs.

      const run = await langgraphClient.runs.create(
        input.threadId,
        input.assistantId,
        {
          input: {
            messages: [{ role: "user", content: input.message }],
          },
        }
      );

      return {
        runId: run.run_id,
      };
    }),
});
