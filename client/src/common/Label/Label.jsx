/* eslint-disable react/prop-types */
import React from 'react';

import MuiTypography from '@mui/material/Typography';
import theme from '../../config/mui.config';

function Label({ title, error }) {
  return (
    <MuiTypography
      sx={{
        color: error ? theme.palette.red[900] : theme.palette.grey[200],
        fontWeight: 600,
        paddingBottom: 1,
      }}
      variant="body2"
    >
      {title}
    </MuiTypography>
  );
}

export default Label;
