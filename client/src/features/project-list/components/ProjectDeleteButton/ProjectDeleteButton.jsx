/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';

import MuiDialog from '@mui/material/Dialog';
import MuiIconButton from '@mui/material/IconButton';
import MuiTypography from '@mui/material/Typography';
import MuiDialogTitle from '@mui/material/DialogTitle';
import MuiDialogActions from '@mui/material/DialogActions';
import MuiDialogContent from '@mui/material/DialogContent';
import MuiDialogContentText from '@mui/material/DialogContentText';

import MuiDeleteIcon from '@mui/icons-material/Delete';
import theme from '../../../../config/mui.config';

import CancelButton from '../../../../common/CancelButton';
import SecondaryButton from '../../../../common/SecondaryButton';

import { setMessageBarOpen } from '../../../message-bar/message-bar.slice';
import { useDeleteProjectMutation } from '../../../project/project.api';
import { setLoadingProjectList } from '../../project-list.slice';

function ProjectDeleteButton({ id }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [deleteProject, { isSuccess }] = useDeleteProjectMutation();

  useEffect(() => {
    if (isSuccess) setMessageBarOpen(true);
  }, [isSuccess]);

  return (
    <>
      <MuiIconButton
        size="small"
        sx={{
          color: theme.palette.grey[1200],
          transition: 'ease-in-out 0.2s',
          '&:hover': { color: theme.palette.primary[900] },
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
    </>
  );
}

export default ProjectDeleteButton;
