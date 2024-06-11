import React from "react";
import Modal from "../../../../common/components/Modal";
import ModalBody from "../../../../common/components/ModalBody";
import ModalHeader from "../../../../common/components/ModalHeader";
import IssueForm from "../../pages/IssueForm";

interface Props {
  open: boolean;
  handleClose: () => void;
  projectId?: string;
}

export default function IssueModal({ open, handleClose, projectId }: Props) {
  return (
    <Modal open={open} handleClose={handleClose}>
      <ModalHeader
        title="New Issue"
        subtitle="Create issue and assign them to people"
        handleClose={handleClose}
      />
      <ModalBody>
        <IssueForm handleClose={handleClose} projectId={projectId} />
      </ModalBody>
    </Modal>
  );
}
