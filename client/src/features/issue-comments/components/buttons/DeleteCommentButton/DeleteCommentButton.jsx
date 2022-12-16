import { useState } from "react";
import { useDispatch } from "react-redux";

import MuiBox from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import MuiTypography from "@mui/material/Typography";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import CancelButton from "../../../../../common/buttons/CancelButton";
import SecondaryButton from "../../../../../common/buttons/SecondaryButton";

import { setLoadingComments } from "../../../slice/issue-comments.slice";
import { useDeleteCommentMutation } from "../../../api/issue-comments.api";

const DeleteCommentButton = ({ id, issue_id }) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const [deleteCommentMutation, { isSuccess }] = useDeleteCommentMutation();

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
              Once the comments is deleted, it cannot be recovered.
            </MuiTypography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <CancelButton label="Cancel" onClick={handleClose} />
          <SecondaryButton
            label="Delete"
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

export default DeleteCommentButton;
