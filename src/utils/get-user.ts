"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { db } from "@/db";

export const getUser = async () => {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();

  return await db.user.findFirst({
    where: {
      kindeUserId: user?.id as string,
    },
  });
};
