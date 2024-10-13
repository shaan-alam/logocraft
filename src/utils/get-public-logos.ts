"use server";

import { db } from "@/db";

export const getPublicLogos = async () => {
  return await db.logo.findMany({
    where: {
      isPublic: true,
    },
    include: {
      user: true,
    },
    take: 30,
    orderBy: {
      createdAt: "desc",
    },
  });
};
