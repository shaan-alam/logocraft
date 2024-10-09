import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createServerActionProcedure } from "zsa";

import { db } from "@/db";

export const authedProcedure = createServerActionProcedure().handler(
  async () => {
    try {
      const { getUser } = await getKindeServerSession();
      const user = await getUser();

      return {
        db,
        user: {
          id: user.id,
        },
      };
    } catch {
      throw new Error("User not authenticated");
    }
  }
);
