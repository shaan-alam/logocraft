import axios from "axios";

import { env } from "../../env";

export const LEMON_SQUEEZY_API_ENDPOINT = "https://api.lemonsqueezy.com/v1/";

export const lemonSqueezyApiInstance = axios.create({
  baseURL: LEMON_SQUEEZY_API_ENDPOINT,
  headers: {
    Accept: "application/vnd.api+json",
    "Content-Type": "application/vnd.api+json",
    Authorization: `Bearer ${env.LEMON_SQUEEZY_API_KEY}`,
  },
});
