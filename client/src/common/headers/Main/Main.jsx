import React from 'react';
import { Outlet } from 'react-router-dom';

import MuiBox from '@mui/material/Box';
import MuiToolbar from '@mui/material/Toolbar';

import MessageBar from '../../notifications/MessageBar';
import MenuSidebar from '../../navigations/MenuSidebar';
import theme from '../../../config/mui.config';

function Main() {
  return (
    <>
      <MenuSidebar />
      <MuiBox
        sx={{
          flexGrow: 1,
          paddingTop: '20px',
          paddingLeft: '30px',
          paddingRight: '30px',
          backgroundColor: theme.palette.background.default,
        }}
      >
        <MuiToolbar variant="dense" />
        <Outlet />
        <MessageBar />
      </MuiBox>
    </>
  );
}

export default Main;
