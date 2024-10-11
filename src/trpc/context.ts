import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { TRPCError } from "@trpc/server";

import { db } from "@/db";

export const createContext = async () => {
  const { getUser } = await getKindeServerSession();
  const kindeUser = await getUser();

  try {
    const user = await db.user.findFirst({
      where: {
        kindeUserId: kindeUser.id,
      },
    });

    const ctx = { user, db };
    return ctx;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Please Sign-in first!",
    });
  }
};

export type Context = typeof createContext;
