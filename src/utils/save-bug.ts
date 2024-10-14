"use server";

import { Bug } from "@prisma/client";

import { db } from "@/db";

export const saveBug = async (bug: Omit<Bug, "id">) => {
  return await db.bug.create({
    data: {
      ...bug,
    },
  });
};
