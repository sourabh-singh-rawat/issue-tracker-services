import React, { useState } from "react";
import MuiAddIcon from "@mui/icons-material/Add";
import MuiIconButton from "@mui/material/IconButton";
import Modal from "../../common/components/Modal";
import ModalBody from "../../common/components/ModalBody";
import { SpaceForm } from "./SpaceForm";
import { useAppSelector } from "../../common/hooks";

interface SpacesModalProps {}

export function SpacesModal(props: SpacesModalProps) {
  const [open, setOpen] = useState(false);
  const defaultWorkspace = useAppSelector((s) => s.workspace.defaultWorkspace);

  return (
    <>
      <MuiIconButton size="small" onClick={() => setOpen(true)}>
        <MuiAddIcon />
      </MuiIconButton>

      {open && (
        <Modal open={open} handleClose={() => setOpen(false)}>
          <ModalBody>
            <SpaceForm workspaceId={defaultWorkspace.id} />
          </ModalBody>
        </Modal>
      )}
    </>
  );
}
