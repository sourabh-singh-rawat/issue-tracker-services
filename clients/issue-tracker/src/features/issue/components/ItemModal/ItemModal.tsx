import { PestControl } from "@mui/icons-material";
import { useState } from "react";
import Modal from "../../../../common/components/Modal";
import ModalBody from "../../../../common/components/ModalBody";
import ModalHeader from "../../../../common/components/ModalHeader";
import PrimaryButton from "../../../../common/components/buttons/PrimaryButton";
import ItemForm from "../../pages/ItemForm";

interface ItemModalProps {
  listId: string;
  parentItemId?: string;
}

export default function ItemModal({ listId, parentItemId }: ItemModalProps) {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <>
      <PrimaryButton
        label="Add"
        onClick={handleOpen}
        startIcon={<PestControl />}
      />
      <Modal open={open} handleClose={handleClose}>
        <ModalHeader title="New Item" handleClose={handleClose} subtitle="" />
        <ModalBody>
          <ItemForm listId={listId} parentItemId={parentItemId} />
        </ModalBody>
      </Modal>
    </>
  );
}
