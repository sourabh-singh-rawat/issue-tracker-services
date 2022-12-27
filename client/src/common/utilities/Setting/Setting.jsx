/* eslint-disable react/prop-types */
/* eslint-disable object-curly-newline */
import React from 'react';
import MuiGrid from '@mui/material/Grid';
import MuiTypography from '@mui/material/Typography';
import theme from '../../../config/mui.config';

export default function Setting({ title, children }) {
  return (
    <MuiGrid sx={{ padding: '16px' }} xs={12} container>
      <MuiGrid xs={2} item>
        <MuiTypography
          color={theme.palette.grey[900]}
          fontWeight={600}
          variant="body2"
        >
          {title}
        </MuiTypography>
      </MuiGrid>
      <MuiGrid xs={10} item>
        {children}
      </MuiGrid>
    </MuiGrid>
  );
}
