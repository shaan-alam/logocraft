import { NextResponse } from "next/server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { db } from "@/db";
import { lemonSqueezyApiInstance } from "@/lib/axios";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { getUser } = getKindeServerSession();
    const kindUser = await getUser();

    const user = await db.user.findFirst({
      where: {
        kindeUserId: kindUser.id,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    const reqData = await req.json();

    if (!reqData.productId)
      return NextResponse.json(
        { message: "productId is required" },
        { status: 400 }
      );

    const response = await lemonSqueezyApiInstance.post("/checkouts", {
      data: {
        type: "checkouts",
        attributes: {
          checkout_data: {
            custom: {
              userId: user?.id,
            },
          },
        },
        relationships: {
          store: {
            data: {
              type: "stores",
              id: process.env.LEMON_SQUEEZY_STORE_ID?.toString(),
            },
          },
          variant: {
            data: {
              type: "variants",
              id: reqData.productId.toString(),
            },
          },
        },
      },
    });

    const checkoutUrl = response.data.data.attributes.url;

    console.log(response.data);

    return NextResponse.json({ checkoutUrl });
  } catch (error) {
    console.error(error);
    Response.json({ message: "An error occured" }, { status: 500 });
  }
}
