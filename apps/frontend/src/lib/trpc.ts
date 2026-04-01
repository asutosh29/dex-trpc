import { createTRPCClient, unstable_httpBatchStreamLink } from '@trpc/client';
import type { AppRouter } from '@repo/server/trpc/appRouter';

export const trpcClient = createTRPCClient<AppRouter>({
  links: [
    unstable_httpBatchStreamLink({
      url: 'http://localhost:3000',
    }),
  ],
});