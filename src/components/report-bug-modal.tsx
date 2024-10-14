"use client";

import { useState } from "react";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";

import useReportBugs from "@/hooks/use-report-bugs";

const ReportBugModal = () => {
  const [bug, setBug] = useState("");
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [error, setError] = useState<string>("");

  const { user } = useKindeBrowserClient();

  const { mutate: reportBug, isLoading } = useReportBugs({
    closeModal: onClose,
  });

  const onBugSubmit = () => {
    if (bug.trim().length === 0) {
      return setError("Please provide a valid description of the bug!");
    }

    if (bug.trim().length > 0 && bug.trim().length < 10) {
      return setError("The bug description must have atleast 10 characters!");
    }

    setError("");

    if (user) {
      reportBug({
        name: user.given_name as string,
        email: user.email as string,
        bug: bug.trim(),
      });
      setBug("");
    }
  };

  return (
    <>
      <span
        onClick={onOpen}
        className="cursor-pointer text-default-500 underline"
      >
        Report a Bug
      </span>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Report A Bug 🐛
              </ModalHeader>
              <ModalBody>
                <Input disabled value={user?.given_name as string} />
                <Input disabled value={user?.email as string} />

                <Textarea
                  placeholder="Describe the bug"
                  rows={5}
                  value={bug}
                  onChange={(e) => setBug(e.target.value)}
                  isInvalid={error?.length !== 0}
                  errorMessage={error}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  disableRipple
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  isLoading={isLoading}
                  type="submit"
                  disableRipple
                  onClick={onBugSubmit}
                >
                  Submit Bug
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReportBugModal;
