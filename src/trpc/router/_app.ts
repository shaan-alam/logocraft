import axios from "axios";
import { z } from "zod";

import { env } from "../../../env";
import { createContext } from "../context";
import { publicProcedure } from "../procedure";
import { createCallerFactory, mergeRouters, router } from "../trpc";

type APIResponse = {
  data: {
    key: string;
    imageURL: string;
  }[];
};

export const helloRouter = router({
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
    .mutation(async ({ ctx, input }) => {
      const { name, config } = input;

      const { isPublic, ...apiBody } = config;

      const { data } = await axios.post<unknown, APIResponse>(
        env.API_BASE_URL,
        {
          ...apiBody,
        }
      );

      const generation = await ctx.db.logo.create({
        data: {
          name: name || "",
          logoURLs: data.map((logo) => logo.imageURL),
          userId: ctx.user?.id as string,
          isPublic,
        },
      });

      return generation;
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
