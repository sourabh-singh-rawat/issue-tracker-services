/* eslint-disable react/prop-types */
import React from 'react';

import MuiButton from '@mui/material/Button';
import theme from '../../config/mui.config';

export default function CancelButton({ label, onClick }) {
  return (
    <MuiButton
      sx={{
        color: theme.palette.grey[200],
        height: '100%',
        borderRadius: theme.shape.borderRadiusMedium,
        backgroundColor: theme.palette.grey[1300],
        textTransform: 'none',
        '&:hover': {
          boxShadow: 4,
          backgroundColor: theme.palette.grey[1100],
        },
      }}
      disableRipple
      onClick={onClick}
    >
      {label}
    </MuiButton>
  );
}
