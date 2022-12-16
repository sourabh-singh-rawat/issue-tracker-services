import { useDispatch, useSelector } from "react-redux";
import { setMessageBarOpen } from "../../../features/message-bar/slice/message-bar.slice";

import MuiSlide from "@mui/material/Slide";
import MuiSnackbar from "@mui/material/Snackbar";
import MuiIconButton from "@mui/material/IconButton";
import MuiCloseIcon from "@mui/icons-material/Close";

const SlideTransition = (props) => <MuiSlide {...props} direction="up" />;

const MessageBar = () => {
  const dispatch = useDispatch();
  const messageBar = useSelector((store) => store.messageBar);

  const handleClose = (e, reason) => {
    if (reason === "clickaway") return;
    dispatch(setMessageBarOpen(false));
  };

  const action = (
    <MuiIconButton
      size="small"
      color="inherit"
      onClick={() => dispatch(setMessageBarOpen(false))}
    >
      <MuiCloseIcon fontSize="small" />
    </MuiIconButton>
  );

  return (
    <MuiSnackbar
      open={messageBar.open}
      autoHideDuration={6000}
      onClose={handleClose}
      action={action}
      message={messageBar.message}
      TransitionComponent={SlideTransition}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    />
  );
};

export default MessageBar;
