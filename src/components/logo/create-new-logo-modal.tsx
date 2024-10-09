"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { IconPlus } from "@tabler/icons-react";

import CreateNewLogoForm from "./create-new-logo-form";

const CreateNewLogoModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} color="primary" disableRipple>
        <IconPlus className="h-4 w-4" />
        Create New Logo
      </Button>
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                New Logo 🚀
              </ModalHeader>
              <ModalBody>
                <CreateNewLogoForm />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateNewLogoModal;
