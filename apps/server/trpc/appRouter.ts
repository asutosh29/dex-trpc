import type { User } from "../types/user";
import { agentRouter } from "./routers/agent";
import { userRouter } from "./routers/user";
import { router } from "./trpc";

export type { User };

export const appRouter = router({
  user: userRouter,
  agent: agentRouter,
});

export type AppRouter = typeof appRouter;
