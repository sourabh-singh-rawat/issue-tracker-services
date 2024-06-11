import React from "react";
import { useAppSelector, useAppDispatch } from "../../../../common/hooks";

import MuiAlert from "@mui/material/Alert";
import MuiSlide, { SlideProps } from "@mui/material/Slide";
import MuiSnackbar from "@mui/material/Snackbar";
import MuiTypography from "@mui/material/Typography";
import MuiCloseIcon from "@mui/icons-material/Close";
import MuiIconButton from "@mui/material/IconButton";

import { hideMessage } from "../../message-bar.slice";

function SlideTransition(props: SlideProps) {
  return <MuiSlide {...props} direction="up" />;
}

export default function MessageBar() {
  const dispatch = useAppDispatch();
  const { message, isOpen, severity } = useAppSelector(
    (store) => store.messageBar,
  );

  const handleClose = (e: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;

    dispatch(hideMessage());
  };

  const action = (
    <MuiIconButton size="small" color="inherit" onClick={handleClose}>
      <MuiCloseIcon fontSize="small" />
    </MuiIconButton>
  );

  return (
    <MuiSnackbar
      action={action}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      autoHideDuration={1000}
      open={isOpen}
      TransitionComponent={SlideTransition}
      onClose={handleClose}
    >
      <MuiAlert severity={severity} onClose={handleClose}>
        <MuiTypography variant="body1">{message}</MuiTypography>
      </MuiAlert>
    </MuiSnackbar>
  );
}
