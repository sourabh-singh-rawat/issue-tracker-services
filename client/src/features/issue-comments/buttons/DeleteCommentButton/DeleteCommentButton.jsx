import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";

import MuiBox from "@mui/material/Box";
import MuiButton from "@mui/material/Button";
import MuiTypography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import SecondaryButton from "../../../../common/SecondaryButton";

import { setLoadingComments } from "../../../issue-comments/issue-comments.slice";
import { useDeleteCommentMutation } from "../../../issue-comments/issue-comments.api";

const DeleteComment = ({ id, issue_id }) => {
  const dispatch = useDispatch();
  const [deleteCommentMutation, { isSuccess }] = useDeleteCommentMutation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    await deleteCommentMutation({ issue_id, commentId: id });
  };

  return (
    <MuiBox component="span">
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
          <MuiTypography variant="body1" component="span">
            Do you want to delete?
          </MuiTypography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <MuiTypography variant="body2" component="span">
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
              ":hover": { backgroundColor: "action.hover" },
            }}
          >
            Cancel
          </MuiButton>
          <SecondaryButton
            onClick={() => {
              handleClose();
              dispatch(setLoadingComments());
              handleDelete();
            }}
          />
        </DialogActions>
      </Dialog>
    </MuiBox>
  );
};

export default DeleteComment;
