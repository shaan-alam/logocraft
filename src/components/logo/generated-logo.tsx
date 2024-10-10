import Image from "next/image";

import { IconDownload } from "@tabler/icons-react";
import { motion } from "framer-motion";

type GeneratedLogoProps = {
  logoURL: string;
  name: string;
};

const GeneratedLogo = ({ logoURL, name }: GeneratedLogoProps) => {
  const downloadLogo = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }

      const blob = await response.blob();

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center"
      initial={{ opacity: 0, filter: "blur(10px)", scale: 0.8 }}
      animate={{ opacity: 1, filter: "blur(0)", scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <span
        className="absolute right-4 top-4 flex cursor-pointer items-center justify-center rounded-md bg-white p-1 text-default-600 transition-transform hover:scale-105"
        onClick={() => downloadLogo(logoURL, `${name}-Logo.png`)}
      >
        <IconDownload />
      </span>
      <Image
        src={logoURL}
        alt={name}
        width={300}
        height={300}
        className="rounded-md"
      />
    </motion.div>
  );
};

export default GeneratedLogo;
