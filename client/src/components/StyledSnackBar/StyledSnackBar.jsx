import { useDispatch, useSelector } from "react-redux";
import { setSnackbarOpen } from "../../redux/snackbar/snackbar.reducer";
import { Snackbar, IconButton, Slide } from "@mui/material";
import { Close } from "@mui/icons-material/";

const SlideTransition = (props) => <Slide {...props} direction="up" />;

const StyledSnackbar = () => {
  const dispatch = useDispatch();
  const snackbar = useSelector((store) => store.snackbar);

  const handleClose = (e, reason) => {
    if (reason === "clickaway") return;
    dispatch(setSnackbarOpen(false));
  };

  const action = (
    <>
      <IconButton
        size="small"
        color="inherit"
        onClick={() => dispatch(setSnackbarOpen(false))}
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

export default StyledSnackbar;
