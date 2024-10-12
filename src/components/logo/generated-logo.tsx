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
import { Logo } from "@prisma/client";
import {
  IconDeviceFloppy,
  IconDotsVertical,
  IconDownload,
  IconTrash,
} from "@tabler/icons-react";
import { motion } from "framer-motion";

import { downloadLogo } from "@/lib/download-logo";

import DeleteLogoModal from "./delete-logo-modal";
import SaveLogoModal from "./save-logo-modal";

type BaseProps = {
  isOnProfilePage?: boolean;
  name: string;
};

type GeneratedLogoProps = BaseProps &
  (
    | {
        isSaved: false;
        logo: {
          key: number;
          imageURL: string;
        };
      }
    | { logo: Logo; isSaved: true }
  );

const GeneratedLogo = ({ name, logo, isSaved }: GeneratedLogoProps) => {
  const {
    isOpen: isSaveModalOpen,
    onOpen: onSaveModalOpen,
    onOpenChange: onSaveOpenChange,
  } = useDisclosure();
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteOpenChange,
  } = useDisclosure();

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center"
      initial={{ opacity: 0, filter: "blur(10px)", scale: 0.8 }}
      animate={{ opacity: 1, filter: "blur(0)", scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card isFooterBlurred radius="lg" className="border-none">
        <Image
          alt={name}
          className="object-cover"
          src={isSaved ? logo.logoURL : logo.imageURL}
        />
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
              {!isSaved ? (
                <DropdownItem key="save">
                  <div
                    className="flex items-center space-x-2"
                    onClick={onSaveModalOpen}
                  >
                    <IconDeviceFloppy className="h-4 w-4" />
                    <span>Save</span>
                  </div>
                </DropdownItem>
              ) : (
                <DropdownItem key="delete" color="danger">
                  <div
                    className="flex items-center space-x-2"
                    onClick={onDeleteModalOpen}
                  >
                    <IconTrash className="h-4 w-4" />
                    <span>Delete</span>
                  </div>
                </DropdownItem>
              )}
              <DropdownItem
                key="download"
                onClick={() =>
                  downloadLogo(
                    isSaved ? logo.logoURL : logo.imageURL,
                    `${name}-Logo.png`
                  )
                }
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
        logoURL={isSaved ? logo.logoURL : logo.imageURL}
        isOpen={isSaveModalOpen}
        onOpenChange={onSaveOpenChange}
      />
      {isSaved && (
        <DeleteLogoModal
          isOpen={isDeleteModalOpen}
          logo={logo}
          onOpenChange={onDeleteOpenChange}
        />
      )}
    </motion.div>
  );
};

export default GeneratedLogo;
