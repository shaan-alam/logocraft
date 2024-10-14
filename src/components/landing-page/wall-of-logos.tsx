"use client";

import { useWallOfLogos } from "@/hooks/use-wall-of-logos";

import LogoCard from "./logo-card";
import LogoSkeletonCard from "./logo-skeleton-card";

const WallOfLogos = () => {
  const { isLoading, data: logos } = useWallOfLogos();

  return (
    <div className="my-12 py-8 text-center">
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-4xl lg:text-5xl">Wall of Logos</h1>
        <p className="text-muted-foreground mt-2 text-sm md:text-base">
          See what other users have generated 🖤
        </p>
        {isLoading && <LogoSkeletonCard />}
        <div className="mt-12 grid grid-cols-1 gap-4 xs:grid-cols-1 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {!isLoading &&
            logos &&
            logos.map((logo) => (
              <div key={logo.id}>
                <LogoCard logo={logo} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default WallOfLogos;
