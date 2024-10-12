"use client";

import { Skeleton } from "@nextui-org/react";
import GeneratedLogo from "@/components/logo/generated-logo";
import { useMyLogos } from "@/hooks/use-my-logos";

type UserProfilePageProps = {
  params: {
    id: string;
  };
};

export default function UserProfilePage({ params }: UserProfilePageProps) {
  const { id } = params;
  const { isLoading, data: logos } = useMyLogos(id);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="my-6 sm:my-8 md:my-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="h-[150px] sm:h-[200px] rounded-lg bg-default-100 p-4">
          <h1 className="text-xl sm:text-2xl">Logos Generated</h1>
          <p className="my-2 sm:my-4 text-4xl sm:text-5xl md:text-7xl font-medium">21</p>
        </div>
        <div className="h-[150px] sm:h-[200px] rounded-lg bg-default-100 p-4">
          <h1 className="text-xl sm:text-2xl">Credits Left</h1>
          <p className="my-2 sm:my-4 text-4xl sm:text-5xl md:text-7xl font-medium">4</p>
          <small className="text-default-400">1 Credit = 3 Logos</small>
        </div>
      </div>
      
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Skeleton className="h-[300px] sm:h-[350px] lg:h-[400px] w-full rounded-lg" />
          <Skeleton className="h-[300px] sm:h-[350px] lg:h-[400px] w-full rounded-lg" />
          <Skeleton className="h-[300px] sm:h-[350px] lg:h-[400px] w-full rounded-lg" />
        </div>
      )}
      
      {logos && logos.length === 0 ? (
        <p className="my-6 sm:my-8 md:my-12 text-lg sm:text-xl">You do not have any Logos yet!</p>
      ) : (
        logos && (
          <div className="my-6 sm:my-8 md:my-12">
            <h1 className="mb-4 sm:mb-6 md:mb-8 text-xl sm:text-2xl font-medium">My Logos</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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