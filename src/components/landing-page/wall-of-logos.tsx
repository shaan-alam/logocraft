"use client";

import { trpc } from "@/utils/trpc";

import LogoCard from "./logo-card";
import LogoSkeletonCard from "./logo-skeleton-card";

const WallOfLogos = () => {
  const { isLoading, data: logos } = trpc.getWallOfLogos.useQuery();

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
        Wall of Logos
      </h1>
      <p className="text-muted-foreground mt-2 text-sm md:text-base">
        See what other users have generated 🖤
      </p>
      {isLoading && (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {[...Array(8)].map((_, index) => (
            <LogoSkeletonCard key={index} />
          ))}
        </div>
      )}
      <div className="mt-6 grid grid-cols-1 gap-4 xs:grid-cols-1 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
        {!isLoading &&
          logos &&
          logos.map((logo) => (
            <div key={logo.id}>
              <LogoCard logo={logo} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default WallOfLogos;
