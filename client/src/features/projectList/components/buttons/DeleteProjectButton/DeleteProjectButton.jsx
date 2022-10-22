import { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import MuiButton from "@mui/material/Button";
import MuiDialog from "@mui/material/Dialog";
import MuiDialogActions from "@mui/material/DialogActions";
import MuiDialogContent from "@mui/material/DialogContent";
import MuiDialogContentText from "@mui/material/DialogContentText";
import MuiDialogTitle from "@mui/material/DialogTitle";
import MuiTypography from "@mui/material/Typography";
import MuiMenuItem from "@mui/material/MenuItem";

import { setSnackbarOpen } from "../../../../snackbar.reducer";
import { useDeleteProjectMutation } from "../../../../project/project.api";
import { setLoadingProjectList } from "../../../projectList.slice";

const DeleteProject = ({ id }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [deleteProject, { isSuccess }] = useDeleteProjectMutation();

  useEffect(() => {
    if (isSuccess) setSnackbarOpen(true);
  }, [isSuccess]);

  return (
    <Fragment>
      <MuiMenuItem disableRipple onClick={handleClickOpen}>
        <MuiTypography variant="body2">Delete</MuiTypography>
      </MuiMenuItem>
      <MuiDialog open={open} onClose={handleClose}>
        <MuiDialogTitle>
          Are you sure you want to delete this project?
        </MuiDialogTitle>
        <MuiDialogContent>
          <MuiDialogContentText component="div">
            <MuiTypography variant="body2">
              Deleting a project is irreversible
            </MuiTypography>
          </MuiDialogContentText>
        </MuiDialogContent>
        <MuiDialogActions>
          <MuiButton onClick={handleClose}>Cancel</MuiButton>
          <MuiButton
            onClick={() => {
              handleClose();
              dispatch(setLoadingProjectList());
              deleteProject({ id });
            }}
            autoFocus
          >
            Delete
          </MuiButton>
        </MuiDialogActions>
      </MuiDialog>
    </Fragment>
  );
};

export default DeleteProject;
