"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { db } from "@/db";

/**
 * Retrieves a user from the database based on the Kinde user session.
 * @returns {Promise<User>} The user object from the database.
 */
export const getCurrentUserFromDB = async () => {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();

  if (user) {
    return await db.user.findFirst({
      where: {
        kindeUserId: user?.id as string,
      },
    });
  }
};
