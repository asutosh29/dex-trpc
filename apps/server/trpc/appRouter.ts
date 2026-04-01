import { router } from "./trpc";
import type { User } from "../types/user";
import { userRouter } from "./routers/user";
import { agentRouter } from "./routers/agent";
export type { User };

export const appRouter = router({
    user: userRouter,
    agent: agentRouter,
})

export type AppRouter = typeof appRouter