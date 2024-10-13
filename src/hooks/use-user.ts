import { useQuery } from "@tanstack/react-query";

import { getCurrentUserFromDB } from "@/utils/get-user";

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const user = await getCurrentUserFromDB();
      return user;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
