import type { User } from "../types/user";
import { userRouter } from "./routers/user";
import { router } from "./trpc";

export type { User };

export const appRouter = router({
  user: userRouter,
});

export type AppRouter = typeof appRouter;
