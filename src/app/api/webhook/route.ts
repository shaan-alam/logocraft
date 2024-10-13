import crypto from "crypto";

import { db } from "@/db";
import { env } from "../../../../env";

export async function POST(req: Request) {
  try {
    // Catch the event type
    const clonedReq = req.clone();
    const eventType = req.headers.get("X-Event-Name");
    const body = await req.json();

    const variant_id = body.data.first_order_item.variant_id;

    let credits = 0;
    if (variant_id == 553286) {
      credits = 30;
    } else if (variant_id == 553287) {
      credits = 100;
    }

    // Check signature
    const secret = `${env.LEMON_SQUEEZY_WEBHOOK_SIGNATURE}`;
    const hmac = crypto.createHmac("sha256", secret);
    const digest = Buffer.from(
      hmac.update(await clonedReq.text()).digest("hex"),
      "utf8"
    );
    const signature = Buffer.from(req.headers.get("X-Signature") || "", "utf8");

    if (!crypto.timingSafeEqual(digest, signature)) {
      throw new Error("Invalid signature.");
    }

    // Logic according to event
    console.log("credits ===========>", credits);
    if (eventType === "order_created") {
      const userId = body.meta.custom_data.userId;
      const isSuccessful = body.data.attributes.status === "paid";

      if (isSuccessful && userId) {
        await db.user.update({
          where: {
            id: userId,
          },
          data: {
            credits: {
              increment: credits,
            },
          },
        });
      }
    }

    return Response.json({ message: "Webhook received" });
  } catch (err) {
    console.error(err);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
