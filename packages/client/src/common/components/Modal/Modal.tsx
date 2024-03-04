import React from "react";

import { useTheme } from "@mui/material";
import MuiBox from "@mui/material/Box";
import MuiModal from "@mui/material/Modal";

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ children, open, handleClose }: ModalProps) {
  const theme = useTheme();

  return (
    <MuiModal
      open={open}
      onClose={handleClose}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <MuiBox
        sx={{
          bgcolor: "background.paper",
          p: theme.spacing(4),
          maxWidth: theme.spacing(80),
          boxShadow: 24,
          borderRadius: theme.shape.borderRadiusMedium,
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {children}
      </MuiBox>
    </MuiModal>
  );
}
