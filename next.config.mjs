import createJITI from "jiti";
import { fileURLToPath } from "node:url";

const jiti = createJITI(fileURLToPath(import.meta.url));

jiti("./env");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "image.pollinations.ai",
        protocol: "https",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;