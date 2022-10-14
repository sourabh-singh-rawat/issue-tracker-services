import { useState, Fragment, useEffect } from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import MuiTypography from "@mui/material/Typography";
import MuiButton from "@mui/material/Button";
import { DialogActions, DialogContent, DialogContentText } from "@mui/material";

import { useDeleteCommentMutation } from "../../issue.api";

export default function ({ id, issue_id }) {
  const [deleteCommentMutation, { isSuccess }] = useDeleteCommentMutation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    await deleteCommentMutation({ issue_id, commentId: id });
  };

  return (
    <Fragment>
      <MuiTypography
        variant="body2"
        onClick={handleOpen}
        sx={{
          fontSize: "13px",
          fontWeight: 600,
          ":hover": { cursor: "pointer" },
        }}
      >
        <a>Delete</a>
      </MuiTypography>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <MuiTypography variant="body1">Do you want to delete?</MuiTypography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <MuiTypography variant="body2">
              This action is irreversible
            </MuiTypography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <MuiButton
            onClick={handleClose}
            sx={{
              textTransform: "none",
              color: "text.primary",
              ":hover": {
                backgroundColor: "action.hover",
              },
            }}
          >
            Cancel
          </MuiButton>
          <MuiButton
            onClick={() => {
              handleClose();
              handleDelete();
            }}
            sx={{
              textTransform: "none",
              backgroundColor: "warning.main",
              color: "white",
              ":hover": { backgroundColor: "warning.dark" },
            }}
          >
            Delete
          </MuiButton>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
