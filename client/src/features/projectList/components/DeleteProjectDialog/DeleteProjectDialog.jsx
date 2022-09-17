import { Fragment, useState, useEffect } from "react";

import MuiButton from "@mui/material/Button";
import MuiDialog from "@mui/material/Dialog";
import MuiDialogActions from "@mui/material/DialogActions";
import MuiDialogContent from "@mui/material/DialogContent";
import MuiDialogContentText from "@mui/material/DialogContentText";
import MuiDialogTitle from "@mui/material/DialogTitle";
import MuiTypography from "@mui/material/Typography";

import { setSnackbarOpen } from "../../../snackbar.reducer";
import { useDeleteProjectMutation } from "../../../project/project.api";

const DeleteProjectDialog = ({ id }) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [deleteProject, { isSuccess }] = useDeleteProjectMutation();

  useEffect(() => {
    if (isSuccess) setSnackbarOpen(true);
  }, [isSuccess]);

  return (
    <Fragment>
      <MuiTypography variant="body2" onClick={handleClickOpen}>
        Delete
      </MuiTypography>
      <MuiDialog open={open} onClose={handleClose}>
        <MuiDialogTitle>
          Are you sure you want to delete this project?
        </MuiDialogTitle>
        <MuiDialogContent>
          <MuiDialogContentText component="div">
            <MuiTypography variant="body2">
              This action is irreversible: {id}
            </MuiTypography>
          </MuiDialogContentText>
        </MuiDialogContent>
        <MuiDialogActions>
          <MuiButton onClick={handleClose}>Cancel</MuiButton>
          <MuiButton
            onClick={() => {
              handleClose();
              deleteProject({ id });
            }}
            autoFocus
          >
            Agree
          </MuiButton>
        </MuiDialogActions>
      </MuiDialog>
    </Fragment>
  );
};

export default DeleteProjectDialog;
