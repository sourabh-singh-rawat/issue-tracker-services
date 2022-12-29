/* eslint-disable react/prop-types */
import React from 'react';
import { useTheme } from '@mui/material/styles';
import MuiTypography from '@mui/material/Typography';

function Label({ title, error }) {
  const theme = useTheme();

  return (
    <MuiTypography
      sx={{
        color: error ? 'error.main' : theme.palette.grey[600],
        fontWeight: 600,
        paddingBottom: 1,
        // // textTransform: "uppercase",
        // // fontSize: "12px",
      }}
      variant="body2"
    >
      {title}
    </MuiTypography>
  );
}

export default Label;
