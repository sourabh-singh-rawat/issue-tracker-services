import { useState } from "react";
import { useViewParams } from "../../../../common";
import Modal from "../../../../common/components/Modal";
import ModalBody from "../../../../common/components/ModalBody";
import ModalHeader from "../../../../common/components/ModalHeader";
import PrimaryButton from "../../../../common/components/buttons/PrimaryButton";
import ItemForm from "../../pages/ItemForm";

export default function ItemModal() {
  const { listId, itemId } = useViewParams();

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <>
      <PrimaryButton label="Add Item" onClick={handleOpen} />
      <Modal open={open} handleClose={handleClose}>
        <ModalHeader title="New Item" handleClose={handleClose} subtitle="" />
        <ModalBody>
          <ItemForm
            listId={"5a6d09b7-a51b-4467-84e0-e706dce06835"}
            parentItemId={itemId}
          />
        </ModalBody>
      </Modal>
    </>
  );
}
