import React, { useState } from "react";
import ListForm from "../project/components/ListForm";
import Modal from "../../common/components/Modal";
import ModalBody from "../../common/components/ModalBody";
import { IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";
import ModalHeader from "../../common/components/ModalHeader";

interface CreateListModalProps {
  workspaceId: string;
  spaceId: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CreateListModal({
  spaceId,
  open,
  setOpen,
}: CreateListModalProps) {
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
}
