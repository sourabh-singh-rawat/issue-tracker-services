/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import MuiBox from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import MuiTypography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import CancelButton from '../../../../../common/buttons/CancelButton';
import SecondaryButton from '../../../../../common/buttons/SecondaryButton';

import { setLoadingComments } from '../../../slice/issue-comments.slice';
import { useDeleteCommentMutation } from '../../../api/issue-comments.api';

function DeleteCommentButton({ id, issue_id }) {
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
        sx={{
          fontSize: '13px',
          fontWeight: 600,
          ':hover': { cursor: 'pointer' },
        }}
        variant="body2"
        onClick={handleOpen}
      >
        Delete
      </MuiTypography>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <MuiTypography component="span" variant="body1">
            Do you want to delete?
          </MuiTypography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <MuiTypography component="span" variant="body2">
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
}

export default DeleteCommentButton;
