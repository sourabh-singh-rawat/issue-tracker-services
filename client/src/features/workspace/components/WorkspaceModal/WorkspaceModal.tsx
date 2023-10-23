import React from "react";

import Modal from "../../../../common/components/Modal";
import ModalHeader from "../../../../common/components/ModalHeader";
import ModalBody from "../../../../common/components/ModalBody";
import WorkspaceForm from "../WorkspaceForm";

interface WorkspaceModalProps {
  open: boolean;
  handleClose: () => void;
}

export default function WorkspaceModal({
  open,
  handleClose,
}: WorkspaceModalProps) {
  return (
    <Modal open={open} handleClose={handleClose}>
      <ModalHeader
        title="Create a new workspace"
        subtitle="Workspaces are where you can create and manage your projects"
        handleClose={handleClose}
      />
      <ModalBody>
        <WorkspaceForm handleClose={handleClose} />
      </ModalBody>
    </Modal>
  );
}
