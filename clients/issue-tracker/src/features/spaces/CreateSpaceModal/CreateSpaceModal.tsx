import React from "react";
import { IconButton } from "@mui/material";
import { useAppSelector } from "../../../common/hooks";
import Modal from "../../../common/components/Modal";
import ModalHeader from "../../../common/components/ModalHeader";
import { SpaceForm } from "../SpaceForm";
import ModalBody from "../../../common/components/ModalBody";
import { Add } from "@mui/icons-material";

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
        <Add />
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
