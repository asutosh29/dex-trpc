import { createHTTPServer } from "@trpc/server/adapters/standalone";
import cors from "cors";

import { appRouter } from "./appRouter";

const server = createHTTPServer({
  middleware: cors(),
  router: appRouter,
});

server.listen(3000);
