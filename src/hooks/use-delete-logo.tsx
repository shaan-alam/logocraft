import { Logo } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteLogo } from "@/utils/delete-logo";

export const useDeleteLogo = (logo: Logo) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await deleteLogo(logo);
    },
    onSuccess: () => {
      queryClient.refetchQueries(["get-my-logos", logo.userId]);
    },
  });
};
