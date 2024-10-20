import { useMutation } from "@tanstack/react-query";

import { getCurrentUserFromDB } from "@/utils/get-user";
import { saveLogo } from "@/utils/save-logo";
import { uploadImageToFirebase } from "@/utils/upload-logo";

type Payload = {
  imageUrl: string;
  filename: string;
  isPublic: boolean;
};

export const useSaveLogo = () => {
  return useMutation({
    mutationFn: async (payload: Payload) => {
      const { imageUrl, filename, isPublic } = payload;
      const user = await getCurrentUserFromDB();

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
