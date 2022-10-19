import { useDispatch, useSelector } from "react-redux";
import { setSnackbarOpen } from "../../features/snackbar.reducer";

import MuiSlide from "@mui/material/Slide";
import MuiSnackbar from "@mui/material/Snackbar";
import MuiIconButton from "@mui/material/IconButton";
import MuiCloseIcon from "@mui/icons-material/Close";

const SlideTransition = (props) => <MuiSlide {...props} direction="up" />;

const SnackBar = () => {
  const dispatch = useDispatch();
  const snackbar = useSelector((store) => store.snackbar);

  const handleClose = (e, reason) => {
    if (reason === "clickaway") return;
    dispatch(setSnackbarOpen(false));
  };

  const action = (
    <MuiIconButton
      size="small"
      color="inherit"
      onClick={() => dispatch(setSnackbarOpen(false))}
    >
      <MuiCloseIcon fontSize="small" />
    </MuiIconButton>
  );

  return (
    <MuiSnackbar
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

export default SnackBar;
