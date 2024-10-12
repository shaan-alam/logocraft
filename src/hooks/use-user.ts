import { useQuery } from "@tanstack/react-query";

import { getUser } from "@/utils/get-user";

export const useUser = (kindeUserId: string) => {
  return useQuery({
    queryKey: ["user", kindeUserId],
    queryFn: async () => {
      const user = await getUser(kindeUserId);
      return user;
    },
    refetchOnWindowFocus: false,
  });
};
