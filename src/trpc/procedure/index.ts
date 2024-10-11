import { withAuth } from "../middlewares/with-auth";
import { procedure } from "../trpc";

export const publicProcedure = procedure;
export const authedProcedure = procedure.use(withAuth);
