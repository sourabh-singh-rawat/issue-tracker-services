import React from "react";
import Modal from "../../../../common/components/Modal";
import ModalBody from "../../../../common/components/ModalBody";
import ModalHeader from "../../../../common/components/ModalHeader";
import ItemForm from "../../pages/ItemForm";

interface Props {
  open: boolean;
  handleClose: () => void;
  projectId?: string;
}

export default function IssueModal({ open, handleClose, projectId }: Props) {
  return (
    <Modal open={open} handleClose={handleClose}>
      <ModalHeader title="New Item" handleClose={handleClose} />
      <ModalBody>
        <ItemForm handleClose={handleClose} projectId={projectId} />
      </ModalBody>
    </Modal>
  );
}
