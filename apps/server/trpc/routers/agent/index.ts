import { router } from "../../trpc";
import { runsRouter } from "./runs";
import { threadsRouter } from "./threads";

export const agentRouter = router({
  threads: threadsRouter,
  runs: runsRouter,
});
