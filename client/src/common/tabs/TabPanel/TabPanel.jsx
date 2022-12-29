/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import MuiBox from '@mui/material/Box';

function TabPanel({ children, selectedTab, index, ...otherProps }) {
  return (
    <MuiBox {...otherProps}>
      {selectedTab === index && <MuiBox>{children}</MuiBox>}
    </MuiBox>
  );
}

export default TabPanel;
