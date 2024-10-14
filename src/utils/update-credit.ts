"use server";

import { db } from "@/db";

export const updateCredits = async (userId: string, no_of_logos: number) => {
  return await db.user.update({
    where: {
      id: userId,
    },
    data: {
      credits: {
        decrement: no_of_logos,
      },
    },
  });
};
