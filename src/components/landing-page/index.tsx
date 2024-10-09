"use client";

import Image from "next/image";

import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "@nextui-org/react";

export default function LandingPage() {
  return (
    <>
      <main className="flex h-screen w-full flex-grow items-center justify-center bg-white">
        <div className="container mx-auto text-center">
          <Image
            src="/logocraft.png"
            height={100}
            width={400}
            alt="LogoCraft"
            className="mx-auto mb-4"
          />
          <p className="mb-8 text-xl text-default-500 md:text-2xl">
            Create stunning logos with the power of AI
          </p>

          <LoginLink>
            <Button variant="shadow" color="primary" disableRipple>
              Start Creating
            </Button>
          </LoginLink>
        </div>
      </main>
    </>
  );
}
