"use server";

import { db } from "@/db";


export const getMyLogos = async (userId: string) => {
  return await db.logo.findMany({
    where: {
      userId,
    },
    include: {
      user: true,
    },
  });
};
