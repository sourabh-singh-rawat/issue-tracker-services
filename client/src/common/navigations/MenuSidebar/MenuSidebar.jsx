/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';

import { styled } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiList from '@mui/material/List';
import MuiDrawer from '@mui/material/Drawer';
import MuiToolbar from '@mui/material/Toolbar';
import MuiIconButton from '@mui/material/IconButton';

import MuiStartIcon from '@mui/icons-material/Start';
import MuiGridViewIcon from '@mui/icons-material/GridView';
import MuiHandshakeIcon from '@mui/icons-material/HandshakeOutlined';
import MuiGroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import MuiSettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import Navbar from '../Navbar';
import MenuSidebarItem from '../MenuSidebarItem';
import theme from '../../../config/mui.config';

export const drawerWidth = 220;

const openedMixin = () => ({
  width: drawerWidth,
  overflowX: 'hidden',
});

const closedMixin = () => ({
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  '& .MuiPaper-root': {
    border: 'none',
    backgroundColor: theme.palette.common.white,
    borderRight: `1px solid ${theme.palette.grey[300]}`,
  },
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const StyledList = styled(MuiList)(() => ({
  '&.MuiList-root': { padding: 0 },
}));

function MenuSidebar() {
  const [open, setOpen] = useState(false);
  const toggleDrawerOpen = () => setOpen(!open);

  const iconStyles = { width: '20px' };

  return (
    <MuiBox>
      <Drawer open={open} variant="permanent">
        <Navbar />
        <MuiToolbar variant="dense" />
        <MuiToolbar
          sx={
            !open
              ? { justifyContent: 'center' }
              : { marginRight: 1, justifyContent: 'right' }
          }
          disableGutters
        >
          <MuiIconButton
            sx={{
              padding: '4px 6px',
              transform: open && 'rotate(180deg)',
              borderRadius: '4px',
              color: theme.palette.grey[500],
              '&:hover': {
                backgroundColor: theme.palette.grey[400],
              },
            }}
            disableRipple
            onClick={toggleDrawerOpen}
          >
            <MuiStartIcon sx={iconStyles} />
          </MuiIconButton>
        </MuiToolbar>
        <StyledList>
          <MenuSidebarItem
            href="/"
            icon={<MuiGridViewIcon sx={iconStyles} />}
            open={open}
            text="Dashboard"
            active
          />
          <MenuSidebarItem
            href="/teams"
            icon={<MuiGroupsOutlinedIcon sx={iconStyles} />}
            open={open}
            text="Teams"
          />
          <MenuSidebarItem
            href="/collaborators"
            icon={<MuiHandshakeIcon sx={iconStyles} />}
            open={open}
            text="Collaborators"
          />
        </StyledList>
        <MenuSidebarItem
          href="/settings"
          icon={<MuiSettingsOutlinedIcon sx={iconStyles} />}
          open={open}
          text="Settings"
        />
      </Drawer>
    </MuiBox>
  );
}

export default MenuSidebar;
