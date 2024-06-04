import React from "react";

import Modal from "../../../../common/components/Modal";
import ModalHeader from "../../../../common/components/ModalHeader";
import ModalBody from "../../../../common/components/ModalBody";
import WorkspaceForm from "../WorkspaceForm";

interface Props {
  open: boolean;
  handleClose: () => void;
}

export default function CreateWorkspaceModal({ open, handleClose }: Props) {
  return (
    <Modal open={open} handleClose={handleClose}>
      <ModalHeader
        title="Create Workspace"
        subtitle="Workspaces are where you can create and manage your projects"
        handleClose={handleClose}
      />
      <ModalBody>
        <WorkspaceForm handleClose={handleClose} />
      </ModalBody>
    </Modal>
  );
}
