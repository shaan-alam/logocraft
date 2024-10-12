import { useMutation } from "@tanstack/react-query";
import axios from "axios";

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
    data: {
      key: number;
      imageURL: string;
    }[];
  };
};

export const useLogo = () => {
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

      const { data } = await axios.post<unknown, APIResponse>(
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

      return data.data;
    },
  });
};
