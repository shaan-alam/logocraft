import { Button, Card, CardFooter, Image } from "@nextui-org/react";
import { IconDownload } from "@tabler/icons-react";
import { motion } from "framer-motion";

import { downloadLogo } from "@/lib/download-logo";

type GeneratedLogoProps = {
  logoURL: string;
  name: string;
};

const GeneratedLogo = ({ logoURL, name }: GeneratedLogoProps) => {
  return (
    <motion.div
      className="relative flex flex-col items-center justify-center"
      initial={{ opacity: 0, filter: "blur(10px)", scale: 0.8 }}
      animate={{ opacity: 1, filter: "blur(0)", scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card isFooterBlurred radius="lg" className="border-none">
        <Image alt={name} className="object-cover" src={logoURL} />
        <CardFooter className="absolute bottom-1 z-10 ml-1 w-[calc(100%_-_8px)] overflow-hidden rounded-large border-1 border-white/20 py-1 shadow-small before:rounded-xl before:bg-white/10">
          <Button
            className="ml-auto bg-black/20 text-tiny text-white"
            variant="flat"
            color="default"
            radius="lg"
            size="sm"
            disableRipple
            onClick={() => downloadLogo(logoURL, `${name}-Logo.png`)}
          >
            <IconDownload className="h-4 w-4" />
            Download
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default GeneratedLogo;
