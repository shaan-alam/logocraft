"use client";

import { getWallOfLogos } from "@/actions/logo.action";
import { useServerActionQuery } from "@/hooks/server-action-hooks";

import LogoCard from "./logo-card";
import LogoSkeletonCard from "./logo-skeleton-card";

const WallOfLogos = () => {
  const { isLoading, data: logos } = useServerActionQuery(getWallOfLogos, {
    queryKey: ["get-wall-of-logos"],
    input: undefined,
  });

  return (
    <div className="container mx-auto text-center">
      <h1 className="text-5xl font-bold">Wall of Logos</h1>
      <p className="mt-2 text-default-500">
        See what other users have generated 🖤
      </p>
      {isLoading && <LogoSkeletonCard />}
      <div className="mt-6 grid grid-cols-4 gap-6">
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
