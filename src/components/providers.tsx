"use client";

import { NextUIProvider } from "@nextui-org/react";

import { TrpcProvider } from "./trpc-provider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <TrpcProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </TrpcProvider>
  );
};

export default Providers;
