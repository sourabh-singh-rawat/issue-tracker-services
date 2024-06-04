import React, { useState } from "react";

import MuiDialog from "@mui/material/Dialog";
import MuiIconButton from "@mui/material/IconButton";
import MuiTypography from "@mui/material/Typography";
import MuiDialogTitle from "@mui/material/DialogTitle";
import MuiDialogActions from "@mui/material/DialogActions";
import MuiDialogContent from "@mui/material/DialogContent";
import MuiDialogContentText from "@mui/material/DialogContentText";
import { useAppDispatch } from "../../../../common/hooks";

import MuiDeleteIcon from "@mui/icons-material/Delete";

import { useTheme } from "@mui/material";
import { setLoadingProjectList } from "../../project-list.slice";
import SecondaryButton from "../../../../common/components/SecondaryButton";
import CancelButton from "../../../../common/components/CancelButton";

function ProjectDeleteButton({ id }) {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const [deleteProject, { isSuccess }] = useDeleteProjectMutation();

  return (
    <>
      <MuiIconButton
        size="small"
        sx={{
          color: theme.palette.grey[100],
          transition: "ease-in-out 0.2s",
          "& svg": { width: "0.875em" },
          "&:hover": { color: theme.palette.primary.main },
        }}
        disableRipple
        onClick={handleClickOpen}
      >
        <MuiDeleteIcon />
      </MuiIconButton>
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
          <SecondaryButton
            label="Delete"
            onClick={() => {
              handleClose();
              dispatch(setLoadingProjectList());
              // deleteProject({ id });
            }}
          />
          <CancelButton label="Cancel" onClick={handleClose} />
        </MuiDialogActions>
      </MuiDialog>
    </>
  );
}

export default ProjectDeleteButton;
