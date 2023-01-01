/* eslint-disable react/prop-types */
import React from 'react';

import MuiButton from '@mui/material/Button';

export default function SaveButton({ label, onClick }) {
  return (
    <MuiButton
      sx={{
        height: '100%',
        textTransform: 'none',
        borderRadius: '6px',
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
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
