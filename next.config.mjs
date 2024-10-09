import createJITI from "jiti";
import { fileURLToPath } from "node:url";

const jiti = createJITI(fileURLToPath(import.meta.url));

jiti("./env");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
        protocol: "https",
        port: "",
        pathname: "/**",
      },
      {
        hostname: "replicate.delivery",
        protocol: "https",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;