/* eslint-disable react/prop-types */
import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import MuiDialog from '@mui/material/Dialog';
import MuiIconButton from '@mui/material/IconButton';
import MuiTypography from '@mui/material/Typography';
import MuiDialogTitle from '@mui/material/DialogTitle';
import MuiDialogActions from '@mui/material/DialogActions';
import MuiDialogContent from '@mui/material/DialogContent';
import MuiDialogContentText from '@mui/material/DialogContentText';

import MuiDeleteIcon from '@mui/icons-material/Delete';
import theme from '../../../../../config/mui.config';

import CancelButton from '../../../../../common/buttons/CancelButton';
import SecondaryButton from '../../../../../common/buttons/SecondaryButton';

import { setMessageBarOpen } from '../../../../message-bar/slice/message-bar.slice';
import { useDeleteProjectMutation } from '../../../../project/api/project.api';
import { setLoadingProjectList } from '../../../slice/project-list.slice';

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
          color: theme.palette.grey[300],
          transition: 'ease-in-out 0.2s',
          '&:hover': { color: theme.palette.primary.main },
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
