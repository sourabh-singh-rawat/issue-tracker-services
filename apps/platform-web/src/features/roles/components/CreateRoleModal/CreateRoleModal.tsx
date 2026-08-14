import Add from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import { Modal, ModalBody, ModalHeader } from "@pine/ui";
import { useNavigate } from "@tanstack/react-router";
import { useState, type MouseEvent } from "react";
import { CreateRoleForm } from "../CreateRoleForm";

export type CreateRoleModalProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const CreateRoleModal = ({
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: CreateRoleModalProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = controlledOnOpenChange ?? setUncontrolledOpen;

  const handleOpen = (event?: MouseEvent) => {
    event?.stopPropagation();
    setOpen(true);
  };

  const handleClose = (event?: MouseEvent | object) => {
    if (event && "stopPropagation" in event && typeof event.stopPropagation === "function") {
      event.stopPropagation();
    }
    setOpen(false);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        size="small"
        aria-label="Create platform role"
        sx={{
          borderRadius: (theme.shape as { borderRadiusMedium?: string }).borderRadiusMedium,
          ":hover": { bgcolor: theme.palette.action.hover },
        }}
        disableRipple
      >
        <Add fontSize="small" />
      </IconButton>
      <Modal open={open} handleClose={handleClose}>
        <ModalHeader
          title="Create platform role"
          subtitle="Define a custom platform role with a stable key."
          handleClose={handleClose}
        />
        <ModalBody>
          <CreateRoleForm
            onCancel={() => {
              setOpen(false);
            }}
            onSuccess={(roleId) => {
              setOpen(false);
              if (roleId) {
                void navigate({
                  to: "/platform-roles/$roleId",
                  params: { roleId },
                });
              }
            }}
          />
        </ModalBody>
      </Modal>
    </>
  );
};
