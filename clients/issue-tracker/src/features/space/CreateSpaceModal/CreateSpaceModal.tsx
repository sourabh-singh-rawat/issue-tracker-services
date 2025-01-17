import { Add } from "@mui/icons-material";
import { IconButton, useTheme } from "@mui/material";
import React from "react";
import Modal from "../../../common/components/Modal";
import ModalBody from "../../../common/components/ModalBody";
import ModalHeader from "../../../common/components/ModalHeader";
import { useAppSelector } from "../../../common/hooks";
import { SpaceForm } from "../SpaceForm";

interface CreateSpaceModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CreateSpaceModal({ open, setOpen }: CreateSpaceModalProps) {
  const theme = useTheme();
  const defaultWorkspace = useAppSelector((s) => s.workspace.current);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton
        size="small"
        sx={{
          bgcolor: theme.palette.primary.main,
          borderRadius: theme.shape.borderRadiusMedium,
          ":hover": {
            bgcolor: theme.palette.primary.dark,
          },
        }}
        onClick={handleOpen}
        disableRipple
      >
        <Add fontSize="small" />
      </IconButton>

      {open && defaultWorkspace && (
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
