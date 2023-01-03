import { Outlet } from 'react-router-dom';
import React from 'react';

import MuiContainer from '@mui/material/Container';
import MuiToolbar from '@mui/material/Toolbar';
import theme from '../../config/mui.config';

import MenuSidebar from '../MenuSidebar';
import MessageBar from '../MessageBar';

function Main() {
  return (
    <>
      <MenuSidebar />
      <MuiContainer
        maxWidth={false}
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
      </MuiContainer>
    </>
  );
}

export default Main;
