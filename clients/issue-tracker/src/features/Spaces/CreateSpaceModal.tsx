import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Modal from "../../common/components/Modal";
import ModalBody from "../../common/components/ModalBody";
import { SpaceForm } from "./SpaceForm";
import { useAppSelector } from "../../common/hooks";
import ModalHeader from "../../common/components/ModalHeader";
import { IconButton } from "@mui/material";

interface CreateSpaceModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CreateSpaceModal({ open, setOpen }: CreateSpaceModalProps) {
  const defaultWorkspace = useAppSelector((s) => s.workspace.defaultWorkspace);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton size="small" onClick={handleOpen}>
        <AddIcon />
      </IconButton>

      {open && (
        <Modal open={open} handleClose={handleClose}>
          <ModalHeader
            title="Create Space"
            subtitle="A Space represents teams, departments, or groups, each with its own Lists, and settings."
            handleClose={handleClose}
          />
          <ModalBody>
            <SpaceForm workspaceId={defaultWorkspace.id} />
          </ModalBody>
        </Modal>
      )}
    </>
  );
}
