/* eslint-disable react/prop-types */
import React from 'react';

import MuiAddIcon from '@mui/icons-material/Add';
import MuiButton from '@mui/material/Button';

export default function PrimaryButton({ type, label, onClick }) {
  return (
    <MuiButton
      startIcon={type === 'submit' ? null : <MuiAddIcon />}
      sx={{
        fontWeight: 600,
        borderRadius: '6px',
        textTransform: 'none',
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
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
