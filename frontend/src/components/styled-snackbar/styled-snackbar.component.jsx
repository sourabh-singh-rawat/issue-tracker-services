import { connect } from "react-redux";
import { setSnackbarClose } from "../../redux/snackbar/snackbar.action-creator";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const StyledSnackbar = (props) => {
  const { snackbar, dispatch } = props;
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
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={6000}
      onClose={() => dispatch(setSnackbarClose())}
      action={action}
      message={snackbar.message}
    />
  );
};

const mapStateToProps = (store) => {
  return {
    snackbar: store.snackbar,
  };
};

export default connect(mapStateToProps)(StyledSnackbar);
