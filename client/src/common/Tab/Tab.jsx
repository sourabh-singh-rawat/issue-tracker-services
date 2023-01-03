/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import MuiTab from '@mui/material/Tab';
import MuiSkeleton from '@mui/material/Skeleton';

function Tab(props) {
  const { isLoading } = props;

  return isLoading ? (
    <MuiSkeleton sx={{ marginRight: 2 }} width="100px" />
  ) : (
    <MuiTab {...props} sx={{ textTransform: 'none' }} disableRipple />
  );
}

export default Tab;
