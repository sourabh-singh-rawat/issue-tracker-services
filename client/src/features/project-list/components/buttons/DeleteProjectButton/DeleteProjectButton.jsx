import { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import MuiDialog from "@mui/material/Dialog";
import MuiMenuItem from "@mui/material/MenuItem";
import MuiTypography from "@mui/material/Typography";
import MuiDialogTitle from "@mui/material/DialogTitle";
import MuiDialogActions from "@mui/material/DialogActions";
import MuiDialogContent from "@mui/material/DialogContent";
import MuiDialogContentText from "@mui/material/DialogContentText";

import CancelButton from "../../../../../common/buttons/CancelButton";
import SecondaryButton from "../../../../../common/buttons/SecondaryButton";

import { setMessageBarOpen } from "../../../../message-bar/slice/message-bar.slice";
import { useDeleteProjectMutation } from "../../../../project/api/project.api";
import { setLoadingProjectList } from "../../../slice/project-list.slice";

const DeleteProject = ({ id }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const [deleteProject, { isSuccess }] = useDeleteProjectMutation();

  useEffect(() => {
    if (isSuccess) setMessageBarOpen(true);
  }, [isSuccess]);

  return (
    <Fragment>
      <MuiMenuItem disableRipple onClick={handleClickOpen}>
        <MuiTypography variant="body2">Delete</MuiTypography>
      </MuiMenuItem>
      <MuiDialog open={open} onClose={handleClose}>
        <MuiDialogTitle>Delete Project?</MuiDialogTitle>
        <MuiDialogContent>
          <MuiDialogContentText component="div">
            <MuiTypography variant="body2">
              Once the project is deleted, it cannot be recovered.
            </MuiTypography>
          </MuiDialogContentText>
        </MuiDialogContent>
        <MuiDialogActions>
          <CancelButton label="Cancel" onClick={handleClose} />
          <SecondaryButton
            label="Delete"
            onClick={() => {
              handleClose();
              dispatch(setLoadingProjectList());
              deleteProject({ id });
            }}
          />
        </MuiDialogActions>
      </MuiDialog>
    </Fragment>
  );
};

export default DeleteProject;
