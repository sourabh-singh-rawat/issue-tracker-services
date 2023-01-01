/* eslint-disable react/prop-types */
import React from 'react';

import MuiDeleteIcon from '@mui/icons-material/Delete';
import MuiIconButton from '@mui/material/IconButton';
import theme from '../../../../config/mui.config';

function DeleteTaskButton({ onClick }) {
  return (
    <MuiIconButton
      size="small"
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
      variant="text"
      onClick={onClick}
    >
      <MuiDeleteIcon />
    </MuiIconButton>
  );
}

export default DeleteTaskButton;
