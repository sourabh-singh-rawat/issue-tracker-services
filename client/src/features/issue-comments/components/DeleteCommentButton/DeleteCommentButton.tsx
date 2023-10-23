import React, { useState } from "react";

import MuiBox from "@mui/material/Box";
import MuiDialog from "@mui/material/Dialog";
import MuiDialogActions from "@mui/material/DialogActions";
import MuiDialogContent from "@mui/material/DialogContent";
import MuiDialogContentText from "@mui/material/DialogContentText";
import MuiDialogTitle from "@mui/material/DialogTitle";
import MuiTypography from "@mui/material/Typography";

import { setLoadingComments } from "../../issue-comments.slice";
import { useTheme } from "@mui/material";
import { useAppDispatch } from "../../../../common/hooks";
import CancelButton from "../../../../common/components/CancelButton";
import SecondaryButton from "../../../../common/components/SecondaryButton";

function DeleteCommentButton({ id, issue_id }) {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const [open, setOpen] = useState(false);

  // const [deleteCommentMutation, { isSuccess }] = useDeleteCommentMutation();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDelete = async () => {
    // await deleteCommentMutation({ issue_id, commentId: id });
  };

  return (
    <MuiBox component="span">
      <MuiTypography
        sx={{
          fontSize: "13px",
          fontWeight: 600,
          ":hover": { cursor: "pointer", color: theme.palette.primary.main },
        }}
        variant="body2"
        onClick={handleOpen}
      >
        Delete
      </MuiTypography>
      <MuiDialog open={open} onClose={handleClose}>
        <MuiDialogTitle>
          <MuiTypography component="span" variant="body1">
            Do you want to delete?
          </MuiTypography>
        </MuiDialogTitle>
        <MuiDialogContent>
          <MuiDialogContentText>
            <MuiTypography component="span" variant="body2">
              Once the comments is deleted, it cannot be recovered.
            </MuiTypography>
          </MuiDialogContentText>
        </MuiDialogContent>
        <MuiDialogActions>
          <CancelButton label="Cancel" onClick={handleClose} />
          <SecondaryButton
            label="Delete"
            onClick={() => {
              handleClose();
              dispatch(setLoadingComments());
              handleDelete();
            }}
          />
        </MuiDialogActions>
      </MuiDialog>
    </MuiBox>
  );
}

export default DeleteCommentButton;
