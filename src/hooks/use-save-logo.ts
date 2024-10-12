import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useMutation } from "@tanstack/react-query";

import { saveLogo } from "@/utils/save-logo";
import { uploadImageToFirebase } from "@/utils/upload-logo";

type Payload = {
  imageUrl: string;
  filename: string;
  isPublic: boolean;
};

export const useSaveLogo = () => {
  const { user } = useKindeBrowserClient();
  return useMutation({
    mutationFn: async (payload: Payload) => {
      const { imageUrl, filename, isPublic } = payload;

      const logoURL = await uploadImageToFirebase(imageUrl, user?.id, filename);

      const savedLogo = await saveLogo({
        isPublic,
        logoURL,
        userId: user?.id as string,
        name: filename,
      });

      return savedLogo;
    },
  });
};
