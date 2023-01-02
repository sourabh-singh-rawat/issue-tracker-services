/* eslint-disable react/prop-types */
import React from 'react';

import MuiAddIcon from '@mui/icons-material/Add';
import MuiButton from '@mui/material/Button';
import theme from '../../config/mui.config';

export default function PrimaryButton({ type, label, onClick }) {
  return (
    <MuiButton
      startIcon={type === 'submit' ? null : <MuiAddIcon />}
      sx={{
        fontWeight: 600,
        borderRadius: theme.shape.borderRadiusMedium,
        textTransform: 'none',
        boxShadow: 'none',
        backgroundColor: theme.palette.primary[900],
        '&:hover': {
          boxShadow: 'none',
          backgroundColor: theme.palette.primary[700],
        },
      }}
      type={type}
      variant="contained"
      disableRipple
      onClick={onClick}
    >
      {label}
    </MuiButton>
  );
}
