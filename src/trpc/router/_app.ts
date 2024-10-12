import { z } from "zod";

import { createContext } from "../context";
import { authedProcedure, publicProcedure } from "../procedure";
import { createCallerFactory, mergeRouters, router } from "../trpc";

export const helloRouter = router({
  sayHello: authedProcedure.query(async () => {
    return "hello";
  }),
  generateLogos: publicProcedure
    .input(
      z.object({
        name: z.string(),
        config: z.object({
          brand_name: z.string().min(1),
          brand_identity: z.string().min(1),
          industry: z.string().min(1),
          logo_style: z.string().min(1),
          color_scheme: z.string().min(1),
          custom_prompt: z.string().optional(),
          isPublic: z.boolean().default(false),
        }),
      })
    )
    .mutation(async ({}) => {
      return "hello";
    }),
  getWallOfLogos: publicProcedure.query(async ({ ctx }) => {
    const logos = await ctx.db.logo.findMany({
      where: {
        isPublic: true,
      },
      include: {
        user: true,
      },
      take: 30,
    });

    return logos;
  }),
});

export const appRouter = mergeRouters(helloRouter);

export const createCaller = createCallerFactory(appRouter);

export const createAsynCaller = async () => {
  const context = await createContext();
  return createCaller(context);
};

export type AppRouter = typeof appRouter;
