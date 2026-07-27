import { useState } from "react";
import { useParams } from "@tanstack/react-router";
import Modal from "../../../../shared/components/Modal";
import ModalBody from "../../../../shared/components/ModalBody";
import ModalHeader from "../../../../shared/components/ModalHeader";
import PrimaryButton from "../../../../shared/components/buttons/PrimaryButton";
import { IssueForm } from "../IssueForm";

interface IssueModalProps {
  projectId: string;
}

export const IssueModal = ({ projectId }: IssueModalProps) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const { issueId } = useParams({ strict: false });

  return (
    <>
      <PrimaryButton label="Add Issue" onClick={handleOpen} size="small" />
      <Modal open={open} handleClose={handleClose}>
        <ModalHeader title="New Issue" handleClose={handleClose} subtitle="" />
        <ModalBody>
          <IssueForm projectId={projectId} parentIssueId={issueId} />
        </ModalBody>
      </Modal>
    </>
  );
};
