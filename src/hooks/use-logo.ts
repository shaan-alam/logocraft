import {
  UseMutationOptions,
  UseMutationResult,
  useMutation,
} from "@tanstack/react-query";
import axios from "axios";

import { getCurrentUserFromDB } from "@/utils/get-user";
import { updateCredits } from "@/utils/update-credit";

import { env } from "../../env";

type Payload = {
  name: string;
  brand_identity: string;
  brand_name: string;
  color_scheme: string;
  industry: string;
  logo_style: string;
  custom_prompt?: string;
};

type APIResponse = {
  data: {
    key: number;
    imageURL: string;
  }[];
};

type TData = {
  key: number;
  imageURL: string;
}[];

type UseLogoProps = (
  options: UseMutationOptions<TData, Error, unknown, unknown>
) => UseMutationResult<TData, Error, Payload, unknown>;

export const useLogo: UseLogoProps = (options) => {
  return useMutation({
    mutationFn: async (payload: Payload) => {
      const {
        brand_identity,
        brand_name,
        color_scheme,
        industry,
        logo_style,
        custom_prompt,
      } = payload;

      const user = await getCurrentUserFromDB();

      if (user && user.credits < 1) {
        throw new Error("insufficient_credits");
      }

      const { data, status } = await axios.post<APIResponse>(
        env.NEXT_PUBLIC_API_BASE_URL,
        {
          brand_name,
          brand_identity,
          industry,
          logo_style,
          color_scheme,
          custom_prompt,
        }
      );

      if (status === 200) {
        await updateCredits(user?.id as string);
      }

      return data.data;
    },
   
    ...options,
  });
};
