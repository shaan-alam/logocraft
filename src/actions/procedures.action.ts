import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createServerActionProcedure } from "zsa";

import { db } from "@/db";

export const authedProcedure = createServerActionProcedure().handler(
  async () => {
    try {
      const { getUser } = await getKindeServerSession();
      const kindeUser = await getUser();

      const user = await db.user.findFirst({
        where: {
          kindeUserId: kindeUser.id,
        },
      });

      return {
        db,
        user: {
          id: user?.id as string,
        },
      };
    } catch {
      throw new Error("User not authenticated");
    }
  }
);

export const publicProcedure = createServerActionProcedure().handler(
  async () => {
    return {
      db,
    };
  }
);
