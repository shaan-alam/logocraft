"use server";

import { db } from "@/db";

type LogoPayload = {
  name: string;
  logoURL: string;
  userId: string;
  isPublic: boolean;
};

export const saveLogo = async (logo: LogoPayload) => {
  return await db.logo.create({
    data: {
      ...logo,
    },
  });
};
