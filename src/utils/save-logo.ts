"use server";

import { db } from "@/db";

type LogoPayload = {
  name: string;
  logoURL: string;
  userId: string;
  isPublic: boolean;
};

export const saveLogo = async (logo: LogoPayload) => {
  const user = await db.user.findFirst({
    where: {
      kindeUserId: logo.userId,
    },
  });

  return await db.logo.create({
    data: {
      ...logo,
      userId: user?.id as string,
    },
  });
};
