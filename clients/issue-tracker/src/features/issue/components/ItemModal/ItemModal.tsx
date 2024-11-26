import React, { useState } from "react";
import Modal from "../../../../common/components/Modal";
import ModalBody from "../../../../common/components/ModalBody";
import ModalHeader from "../../../../common/components/ModalHeader";
import ItemForm from "../../pages/ItemForm";
import MuiIconButton from "@mui/material/IconButton";
import { PlusOne } from "@mui/icons-material";

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
      <MuiIconButton onClick={handleOpen}>
        <PlusOne />
      </MuiIconButton>
      <Modal open={open} handleClose={handleClose}>
        <ModalHeader title="New Item" handleClose={handleClose} subtitle="" />
        <ModalBody>
          <ItemForm listId={listId} parentItemId={parentItemId} />
        </ModalBody>
      </Modal>
    </>
  );
}
