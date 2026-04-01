import { createTRPCClient, httpBatchLink } from "@trpc/client";

import type { AppRouter } from "@repo/server/trpc/appRouter";

export const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000",
    }),
  ],
});
