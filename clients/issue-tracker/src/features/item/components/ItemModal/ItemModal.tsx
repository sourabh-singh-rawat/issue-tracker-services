import { useState } from "react";
import Modal from "../../../../common/components/Modal";
import ModalBody from "../../../../common/components/ModalBody";
import ModalHeader from "../../../../common/components/ModalHeader";
import PrimaryButton from "../../../../common/components/buttons/PrimaryButton";
import { ItemForm } from "../ItemForm";

interface ItemModalProps {
  listId: string;
}

export const ItemModal = ({ listId }: ItemModalProps) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <>
      <PrimaryButton label="Add Item" onClick={handleOpen} size="small" />
      <Modal open={open} handleClose={handleClose}>
        <ModalHeader title="New Item" handleClose={handleClose} subtitle="" />
        <ModalBody>
          <ItemForm listId={listId} />
        </ModalBody>
      </Modal>
    </>
  );
};
