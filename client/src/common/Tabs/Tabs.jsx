/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import MuiTabs from '@mui/material/Tabs';
import theme from '../../config/mui.config';

function Tabs(props) {
  return (
    <MuiTabs
      {...props}
      sx={{
        borderBottom: `1px solid ${theme.palette.grey[1300]}`,
        '.MuiButtonBase-root': {
          padding: 0,
          opacity: 1,
          minWidth: 'auto',
          marginRight: 4,
          fontWeight: 600,
        },
        '& .Mui-selected': {
          color: theme.palette.primary[900],
        },
      }}
    />
  );
}

export default Tabs;
