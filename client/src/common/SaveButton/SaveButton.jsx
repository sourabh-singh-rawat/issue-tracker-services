/* eslint-disable react/prop-types */
import React from 'react';

import MuiButton from '@mui/material/Button';
import theme from '../../config/mui.config';

export default function SaveButton({ label, onClick }) {
  return (
    <MuiButton
      sx={{
        height: '100%',
        backgroundColor: theme.palette.primary[900],
        textTransform: 'none',
        borderRadius: theme.shape.borderRadiusMedium,
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
          backgroundColor: theme.palette.primary[700],
        },
      }}
      variant="contained"
      disableRipple
      onClick={onClick}
    >
      {label}
    </MuiButton>
  );
}
