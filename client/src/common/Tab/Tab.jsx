/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import MuiTab from '@mui/material/Tab';

function Tab(props) {
  return (
    <MuiTab
      {...props}
      sx={{
        color: 'text.main',
        textTransform: 'none',
      }}
      disableRipple
    />
  );
}

export default Tab;
