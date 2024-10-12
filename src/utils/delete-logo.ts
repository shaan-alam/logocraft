"use server";

import { Logo } from "@prisma/client";
import { deleteObject, ref } from "firebase/storage";

import { db } from "@/db";
import { storage } from "@/utils/firebase";

export const deleteLogo = async (logo: Logo) => {
  try {
    const originalLogo = await db.logo.findFirst({
      where: {
        userId: logo.userId,
      },
    });

    if (!originalLogo) {
      throw new Error("You cannot delete this logo!");
    }

    const fileRef = ref(storage, `/images/${logo.userId}/${logo.name}.png`);

    await deleteObject(fileRef);

    await db.logo.delete({
      where: {
        id: originalLogo?.id,
      },
    });
  } catch (error) {
    throw error;
  }
};
