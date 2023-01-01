/* eslint-disable react/prop-types */
import React from 'react';

import MuiButton from '@mui/material/Button';
import theme from '../../config/mui.config';

export default function SecondaryButton({ label, onClick }) {
  return (
    <MuiButton
      sx={{
        textTransform: 'none',
        backgroundColor: theme.palette.warning.main,
        borderRadius: '6px',
        color: 'white',
        ':hover': {
          backgroundColor: theme.palette.warning.dark,
          boxShadow: 4,
        },
      }}
      disableRipple
      onClick={onClick}
    >
      {label}
    </MuiButton>
  );
}
