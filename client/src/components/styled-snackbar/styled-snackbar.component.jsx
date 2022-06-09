import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  setSnackbarClose,
  setSnackbarOpen,
} from "../../redux/snackbar/snackbar.action-creator";
import { Snackbar, IconButton, Slide } from "@mui/material";
import { Close } from "@mui/icons-material/";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}
const StyledSnackbar = (props) => {
  const { snackbar, dispatch } = props;

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setSnackbarClose());
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => {
          dispatch(setSnackbarClose());
        }}
      >
        <Close fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={6000}
      onClose={handleClose}
      action={action}
      message={snackbar.message}
      TransitionComponent={SlideTransition}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    />
  );
};

const mapStateToProps = (store) => {
  return {
    snackbar: store.snackbar,
  };
};

export default connect(mapStateToProps)(StyledSnackbar);
