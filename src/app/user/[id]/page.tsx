"use client";

import Image from "next/image";

import { Skeleton } from "@nextui-org/react";

import GeneratedLogo from "@/components/logo/generated-logo";

import { useMyLogos } from "@/hooks/use-my-logos";
import { useUser } from "@/hooks/use-user";

type UserProfilePageProps = {
  params: {
    id: string;
  };
};

export default function UserProfilePage({ params }: UserProfilePageProps) {
  const { id } = params;
  const { isLoading: isLogosLoading, data: logos } = useMyLogos(id);
  const { data: user, isLoading: isUserLoading } = useUser();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="my-6 grid grid-cols-1 gap-4 sm:my-8 sm:grid-cols-2 md:my-12">
        <div className="h-[150px] rounded-lg bg-default-100 p-4 sm:h-[200px]">
          <h1 className="text-xl sm:text-2xl">Logos Generated</h1>
          <div className="my-2 text-4xl font-medium sm:my-4 sm:text-5xl md:text-7xl">
            {isLogosLoading && (
              <Skeleton as="span" className="h-[60px] w-[100px]" />
            )}
            {logos?.length}
          </div>
        </div>
        <div className="h-[150px] rounded-lg bg-default-100 p-4 sm:h-[200px]">
          <h1 className="text-xl sm:text-2xl">Credits Left</h1>
          <div className="my-2 text-4xl font-medium sm:my-4 sm:text-5xl md:text-7xl">
            {isUserLoading && (
              <Skeleton as="span" className="h-[60px] w-[100px]" />
            )}
            <span className="flex">
              <Image
                src="/coin.svg"
                height={60}
                width={60}
                alt="Coin"
                className="mr-4"
              />
              {user?.credits}
            </span>
          </div>
        </div>
      </div>

      {isLogosLoading && (
        <div className="my-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-[300px] w-full rounded-lg sm:h-[350px] lg:h-[400px]" />
          <Skeleton className="h-[300px] w-full rounded-lg sm:h-[350px] lg:h-[400px]" />
          <Skeleton className="h-[300px] w-full rounded-lg sm:h-[350px] lg:h-[400px]" />
        </div>
      )}

      {logos && logos.length === 0 ? (
        <p className="my-6 text-lg sm:my-8 sm:text-xl md:my-12">
          You do not have any Logos yet!
        </p>
      ) : (
        logos && (
          <div className="my-6 sm:my-8 md:my-12">
            <h1 className="mb-4 text-xl font-medium sm:mb-6 sm:text-2xl md:mb-8">
              My Logos
            </h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {logos.map((logo) => (
                <GeneratedLogo
                  name={logo.name}
                  isSaved={true}
                  key={logo.id}
                  logo={logo}
                  isOnProfilePage
                />
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
}
