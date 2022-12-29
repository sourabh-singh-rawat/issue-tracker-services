/* eslint-disable react/prop-types */
import React from 'react';
import MuiButton from '@mui/material/Button';
import theme from '../../../config/mui.config';

export default function CancelButton({ label, onClick }) {
  return (
    <MuiButton
      sx={{
        color: theme.palette.grey[900],
        height: '100%',
        borderRadius: '6px',
        textTransform: 'none',
        '&:hover': {
          boxShadow: 4,
          backgroundColor: theme.palette.grey[300],
        },
      }}
      disableRipple
      onClick={onClick}
    >
      {label}
    </MuiButton>
  );
}
