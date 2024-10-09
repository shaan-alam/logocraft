"use server";

import { z } from "zod";

import { authedProcedure } from "./procedures.action";

export const createNewLogoAction = authedProcedure
  .createServerAction()
  .input(
    z.object({
      name: z.string(),
    })
  )
  .handler(async ({ ctx, input }) => {
    const { name } = input;

    const logo = await ctx.db.logo.create({
      data: {
        name,
        logoURL: "",
        userId: ctx.user.id,
      },
    });
    return logo;
  });
