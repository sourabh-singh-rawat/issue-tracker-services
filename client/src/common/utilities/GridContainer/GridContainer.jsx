/* eslint-disable react/prop-types */
import React from 'react';
import { useTheme } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';

function GridContainer({ children }) {
  const theme = useTheme();

  return (
    <MuiGrid
      sx={{
        border: `1px solid ${theme.palette.grey[200]}`,
        borderRadius: '4px',
        padding: '16px 24px',
        backgroundColor: theme.palette.background.paper,
      }}
      container
    >
      {children}
    </MuiGrid>
  );
}

export default GridContainer;
