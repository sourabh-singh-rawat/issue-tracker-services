/* eslint-disable react/prop-types */
import React from 'react';

import MuiButton from '@mui/material/Button';
import MuiCircularProgress from '@mui/material/CircularProgress';
import theme from '../../../../config/mui.config';

function UploadButton({ label, onClick, open }) {
  return (
    <MuiButton
      endIcon={
        open && <MuiCircularProgress size={20} sx={{ color: 'white' }} />
      }
      sx={{
        fontWeight: 600,
        borderRadius: theme.shape.borderRadiusMedium,
        textTransform: 'none',
        boxShadow: 'none',
        backgroundColor: theme.palette.primary[900],
      }}
      variant="contained"
      disableRipple
      onClick={onClick}
    >
      {label}
    </MuiButton>
  );
}

export default UploadButton;
