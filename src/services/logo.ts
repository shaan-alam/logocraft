import axios from "axios";

import { env } from "../../env";

type APIResponse = {
  data: {
    key: string;
    imageURL: string;
  }[];
};

export type APIPayload = {
  brand_name: string;
  brand_identity: string;
  industry: string;
  logo_style: string;
  color_scheme: string;
  custom_prompt?: string;
};
export const createLogos = async (apiBody: APIPayload) => {
  const { data } = await axios.post<unknown, APIResponse>(env.NEXT_PUBLIC_API_BASE_URL, {
    ...apiBody,
  });

  return data;
};
