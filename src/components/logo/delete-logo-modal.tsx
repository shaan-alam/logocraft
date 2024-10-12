"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { Logo } from "@prisma/client";
import { toast } from "sonner";

import { useDeleteLogo } from "@/hooks/use-delete-logo";

type DeleteLogoModalProps = {
  logo: Logo;
  isOpen: boolean;
  onOpenChange: () => void;
};

const DeleteLogoModal = ({
  logo,
  isOpen,
  onOpenChange,
}: DeleteLogoModalProps) => {
  const { mutateAsync: deleteLogo } = useDeleteLogo(logo);

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete Logo?
              </ModalHeader>
              <ModalBody>
                <p className="text-sm text-default-400">
                  Do you really wish to delete this logo? This action cannot be
                  undone.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="default"
                  variant="light"
                  onPress={onClose}
                  disableRipple
                >
                  Close
                </Button>
                <Button
                  disableRipple
                  color="danger"
                  onPress={() => {
                    onClose();
                    toast.promise(() => deleteLogo(), {
                      loading: "Deleting...",
                      success: () => {
                        return <>Logo deleted successfully!</>;
                      },
                    });
                  }}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteLogoModal;
