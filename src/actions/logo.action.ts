"use server";

import axios from "axios";
import { z } from "zod";

import { env } from "../../env";
import { authedProcedure } from "./procedures.action";

type APIResponse = {
  data: {
    key: string;
    imageURL: string;
  }[];
};

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
        logoURLs: [],
        userId: ctx.user.id,
      },
    });
    return logo;
  });

export const generateLogosAction = authedProcedure
  .createServerAction()
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
  .handler(async ({ ctx, input }) => {
    const { name, config } = input;

    const { isPublic, ...apiBody } = config;

    const { data } = await axios.post<unknown, APIResponse>(env.API_BASE_URL, {
      ...apiBody,
    });

    const generation = await ctx.db.logo.create({
      data: {
        name: name || "",
        logoURLs: data.map((logo) => logo.imageURL),
        userId: ctx.user.id,
        isPublic,
      },
    });

    return generation;
  });
