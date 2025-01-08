import React from "react";
import Modal from "../../../../common/components/Modal";
import ModalBody from "../../../../common/components/ModalBody";
import ModalHeader from "../../../../common/components/ModalHeader";
import { ListForm } from "../../components";

interface CreateListModalProps {
  workspaceId: string;
  spaceId: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateListModal = ({
  spaceId,
  open,
  setOpen,
}: CreateListModalProps) => {
  const handleOpen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setOpen(true);
  };
  const handleClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setOpen(false);
  };

  return (
    <Modal open={open} handleClose={handleClose}>
      <ModalHeader
        title="Create List"
        subtitle="A List represents major departments or organizations, each with items, and settings."
        handleClose={handleClose}
      />
      <ModalBody>
        <ListForm spaceId={spaceId} />
      </ModalBody>
    </Modal>
  );
};
