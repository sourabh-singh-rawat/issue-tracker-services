/* eslint-disable react/prop-types */
import React from 'react';

import MuiEditIcon from '@mui/icons-material/Edit';
import MuiIconButton from '@mui/material/IconButton';
import theme from '../../../../config/mui.config';

function EditTaskButton({ onClick }) {
  return (
    <MuiIconButton
      sx={{
        color: theme.palette.grey[400],
        border: 'none',
        boxShadow: 'none',
        backgroundColor: 'transparent',
        ':hover': {
          color: theme.palette.grey[600],
          boxShadow: 'none',
          backgroundColor: 'transparent',
        },
      }}
      disableRipple
      onClick={onClick}
    >
      <MuiEditIcon />
    </MuiIconButton>
  );
}

export default EditTaskButton;
