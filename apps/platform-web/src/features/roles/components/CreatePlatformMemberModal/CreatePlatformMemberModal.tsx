import Add from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import { Modal, ModalBody, ModalHeader } from "@pine/ui";
import { useState, type MouseEvent } from "react";
import { CreatePlatformMemberForm } from "../CreatePlatformMemberForm";

export type CreatePlatformMemberModalProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const CreatePlatformMemberModal = ({
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: CreatePlatformMemberModalProps) => {
  const theme = useTheme();
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
        aria-label="Create platform relation"
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
          title="Create platform relation"
          subtitle="Assign an identity to the platform graph."
          handleClose={handleClose}
        />
        <ModalBody>
          <CreatePlatformMemberForm
            onCancel={() => {
              setOpen(false);
            }}
            onSuccess={() => {
              setOpen(false);
            }}
          />
        </ModalBody>
      </Modal>
    </>
  );
};
