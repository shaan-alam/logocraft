"use client";

import { Button } from "@nextui-org/react";

import { buyCredits } from "@/utils/buy-credits";

const BuyCreditsButton = () => {
  return (
    <Button variant="flat" size="sm" onClick={buyCredits} disableRipple>
      Buy more credits
    </Button>
  );
};

export default BuyCreditsButton;
