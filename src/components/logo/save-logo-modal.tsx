"use client";

import { useState } from "react";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Switch,
  Tooltip,
} from "@nextui-org/react";
import { IconHelp } from "@tabler/icons-react";
import { toast } from "sonner";

import { useSaveLogo } from "@/hooks/use-save-logo";

type SaveLogoModalProps = {
  name: string;
  logoURL: string;
  isOpen: boolean;
  onOpenChange: () => void;
};

const SaveLogoModal = ({
  name,
  logoURL,
  isOpen,
  onOpenChange,
}: SaveLogoModalProps) => {
  const [isPublic, setPublic] = useState(false);

  const { mutateAsync: saveLogo } = useSaveLogo();

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Save Logo
              </ModalHeader>
              <ModalBody>
                <p className="text-sm text-default-400">
                  Do you want the logo to be public? To be public means the logo
                  will be visible on the &quot;Wall of Logos&quot; section on
                  the homepage.
                </p>
                <div className="flex items-center space-x-4">
                  <label
                    htmlFor="visibility-switch"
                    className="text-muted-foreground flex items-center space-x-1 text-sm md:text-base"
                  >
                    <span>Keep it public</span>

                    <Tooltip
                      showArrow={true}
                      content="Your logo will be visible on the Landing Page on Wall of Logos section"
                      className="rounded-full p-1"
                    >
                      <IconHelp className="text-muted-foreground h-5 w-5 md:h-6 md:w-6" />
                    </Tooltip>
                  </label>
                  <Switch
                    id="visibility-switch"
                    isSelected={isPublic}
                    onValueChange={setPublic}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    toast.promise(
                      saveLogo({
                        filename: name,
                        imageUrl: logoURL,
                        isPublic,
                      }),
                      {
                        loading: "Saving...",
                        success: () => {
                          return <>Logo Saved successfully!</>;
                        },
                      }
                    );
                    onClose();
                  }}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SaveLogoModal;
