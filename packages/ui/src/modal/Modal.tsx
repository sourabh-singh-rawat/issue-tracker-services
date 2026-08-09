import Box from "@mui/material/Box";
import MuiModal from "@mui/material/Modal";
import { useTheme } from "@mui/material/styles";
import type { MouseEvent, ReactNode } from "react";
import { themeBorderRadiusMedium } from "../theme/shape";

export interface ModalProps {
  open: boolean;
  handleClose: (e?: MouseEvent | object) => void;
  children: ReactNode;
}

export function Modal({ children, open, handleClose }: ModalProps) {
  const theme = useTheme();

  return (
    <MuiModal
      open={open}
      onClose={(_event, _reason) => {
        handleClose(_event);
      }}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          p: theme.spacing(4),
          maxWidth: theme.spacing(80),
          boxShadow: 24,
          borderRadius: themeBorderRadiusMedium(theme),
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          mx: 2,
        }}
      >
        {children}
      </Box>
    </MuiModal>
  );
}

export default Modal;
