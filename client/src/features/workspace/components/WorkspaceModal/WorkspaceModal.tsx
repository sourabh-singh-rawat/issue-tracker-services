import React from "react";

import MuiModal from "@mui/material/Modal";
import MuiBox from "@mui/material/Box";
import { useTheme } from "@mui/material";

import ModalHeader from "../../../../common/components/ModalHeader";
import ModalBody from "../../../../common/components/ModalBody";
import WorkspaceForm from "../WorkspaceForm";

interface WorkspaceModalProps {
  open: boolean;
  handleClose: () => void;
}

export default function WorkspaceModal({
  open,
  handleClose,
}: WorkspaceModalProps) {
  const theme = useTheme();

  return (
    <MuiModal open={open} onClose={handleClose} sx={{ overflowY: "scroll" }}>
      <MuiBox
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          p: 4,
          maxWidth: theme.spacing(60),
          boxShadow: 24,
          borderRadius: theme.shape.borderRadiusMedium,
          [theme.breakpoints.up("md")]: {
            width: "50%",
          },
          [theme.breakpoints.down("md")]: { width: "90%" },
        }}
      >
        <ModalHeader
          title="Create a new workspace"
          subtitle="Workspaces are where you can create and manage your projects"
          handleClose={handleClose}
        />
        <ModalBody>
          <WorkspaceForm handleClose={handleClose} />
        </ModalBody>
      </MuiBox>
    </MuiModal>
  );
}
