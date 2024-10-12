import { useQuery } from "@tanstack/react-query";

import { getPublicLogos } from "@/utils/get-public-logos";

export const useWallOfLogos = () => {
  return useQuery({
    queryKey: ["wall-of-logos"],
    queryFn: async () => {
      const logos = await getPublicLogos();

      return logos;
    },
  });
};
