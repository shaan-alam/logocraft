"use server";

import { db } from "@/db";

export const updateCredits = async (userId: string) => {
  return await db.user.update({
    where: {
      id: userId,
    },
    data: {
      credits: {
        decrement: 1,
      },
    },
  });
};
