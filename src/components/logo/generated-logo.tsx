import {
  Button,
  Card,
  CardFooter,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  useDisclosure,
} from "@nextui-org/react";
import {
  IconDeviceFloppy,
  IconDotsVertical,
  IconDownload,
} from "@tabler/icons-react";
import { motion } from "framer-motion";

import { downloadLogo } from "@/lib/download-logo";

import SaveLogoModal from "./save-logo-modal";

type GeneratedLogoProps = {
  logoURL: string;
  name: string;
};

const GeneratedLogo = ({ logoURL, name }: GeneratedLogoProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
          <Dropdown>
            <DropdownTrigger>
              <Button
                className="ml-auto bg-black/20 text-tiny text-white"
                variant="flat"
                color="default"
                radius="lg"
                size="sm"
                disableRipple
              >
                <IconDotsVertical />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem key="save">
                <div className="flex items-center space-x-2" onClick={onOpen}>
                  <IconDeviceFloppy className="h-4 w-4" />
                  <span>Save</span>
                </div>
              </DropdownItem>
              <DropdownItem
                key="download"
                onClick={() => downloadLogo(logoURL, `${name}-Logo.png`)}
              >
                <div className="flex items-center space-x-2">
                  <IconDownload className="h-4 w-4" />
                  <span>Download</span>
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </CardFooter>
      </Card>
      <SaveLogoModal
        name={name}
        logoURL={logoURL}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </motion.div>
  );
};

export default GeneratedLogo;
