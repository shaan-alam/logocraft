import { Bug } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";

import { saveBug } from "@/utils/save-bug";

type Payload = Omit<Bug, "id">;

const useReportBugs = ({ closeModal }: { closeModal: () => void }) => {
  return useMutation({
    mutationFn: async (payload: Payload) => {
      const newBug = await saveBug(payload);
      return newBug;
    },
    onSuccess: () => {
      closeModal();
    },
  });
};

export default useReportBugs;
