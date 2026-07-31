import Add from "@mui/icons-material/Add";
import { IconButton, useTheme } from "@mui/material";
import React from "react";
import Modal from "../../../../shared/components/Modal";
import ModalBody from "../../../../shared/components/ModalBody";
import ModalHeader from "../../../../shared/components/ModalHeader";
import { ProjectForm } from "../ProjectForm";

interface CreateProjectModalProps {
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateProjectModal = ({
  open: controlledOpen,
  setOpen: controlledSetOpen,
}: CreateProjectModalProps) => {
  const theme = useTheme();
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = controlledSetOpen ?? setUncontrolledOpen;

  const handleOpen = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setOpen(true);
  };
  const handleClose = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setOpen(false);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        size="small"
        sx={{
          borderRadius: theme.shape.borderRadiusLarge,
          ":hover": { bgcolor: theme.palette.action.hover },
        }}
        disableRipple
      >
        <Add fontSize="small" />
      </IconButton>
      <Modal open={open} handleClose={handleClose}>
        <ModalHeader
          title="Create Project"
          subtitle="A Project is a container for issues."
          handleClose={handleClose}
        />
        <ModalBody>
          <ProjectForm />
        </ModalBody>
      </Modal>
    </>
  );
};
