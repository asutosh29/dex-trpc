import { z } from "zod";

import type { User } from "../appRouter";
import { publicProcedure, router } from "../trpc";

export const userRouter = router({
  userList: publicProcedure.query(async () => {
    const users: User[] = [
      { id: "1", name: "John" },
      { id: "2", name: "Jane" },
      { id: "3", name: "Bob" },
    ];
    return users;
  }),
  userById: publicProcedure.input(z.string()).query(async (opts) => {
    const { input: id } = opts;
    const user: User = {
      id,
      name: "amx",
    };
    return user;
  }),
  userCreate: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async (opts) => {
      const { input } = opts;
      const user: User = {
        id: "4",
        name: input.name,
      };
      return user;
    }),
});
