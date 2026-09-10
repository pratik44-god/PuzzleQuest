import { router } from "./trpc";

import { authRouter } from "./routes/auth/route";
import { healthRouter } from "./routes/health/route";
import { huntRouter } from "./routes/hunt/route";

export const serverRouter = router({
  health: healthRouter,
  auth: authRouter,
  hunt: huntRouter,
});

export { createContext } from "./context";
export type ServerRouter = typeof serverRouter;
