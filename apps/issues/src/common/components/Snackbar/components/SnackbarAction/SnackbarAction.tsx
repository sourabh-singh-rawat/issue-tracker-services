import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { closeSnackbar } from "notistack";

export function SnackbarAction() {
  return (
    <IconButton size="small" color="inherit" onClick={() => closeSnackbar()}>
      <CloseIcon fontSize="small" />
    </IconButton>
  );
}
