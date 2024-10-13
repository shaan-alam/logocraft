"use client";

import axios from "axios";
import { toast } from "sonner";

export const buyCredits = async () => {
  try {
    const response = await axios.post("/api/purchase-product", {
      productId: "553286",
    });

    window.open(response.data.checkoutUrl, "_blank");
  } catch (err) {
    console.log(err);
    toast.error("Something went wrong!");
  }
};
