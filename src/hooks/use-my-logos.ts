import { useQuery } from "@tanstack/react-query";

import { getMyLogos } from "@/utils/get-my-logos";

export const useMyLogos = (userId: string) => {
  return useQuery({
    queryKey: ["get-my-logos", userId],
    queryFn: async () => {
      const logos = await getMyLogos(userId);
      return logos;
    },
  });
};
