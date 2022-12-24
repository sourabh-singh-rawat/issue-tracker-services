/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';

import { styled, useTheme } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiList from '@mui/material/List';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import MuiToolbar from '@mui/material/Toolbar';
import MuiIconButton from '@mui/material/IconButton';

import MuiStartIcon from '@mui/icons-material/Start';
import MuiTaskOutlinedIcon from '@mui/icons-material/TaskOutlined';
import MuiGridViewIcon from '@mui/icons-material/GridView';
import MuiHandshakeIcon from '@mui/icons-material/HandshakeOutlined';
import MuiGroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import MuiSettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import MuiBugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import MuiAssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';

import Navbar from '../Navbar';
import MenuSidebarItem from '../MenuSidebarItem';

export const drawerWidth = 220;

const openedMixin = () => ({
  width: drawerWidth,
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  '& .MuiPaper-root': {
    border: 'none',
    backgroundColor: theme.palette.grey[100],
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
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const toggleDrawerOpen = () => setOpen(!open);

  const iconStyles = { width: '20px' };

  return (
    <MuiBox>
      <Drawer variant="permanent" open={open}>
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
            onClick={toggleDrawerOpen}
            sx={{
              padding: '4px 6px',
              transform: open && 'rotate(180deg)',
              borderRadius: '4px',
              '&:hover': {
                backgroundColor: theme.palette.background.paper,
              },
            }}
            disableRipple
          >
            <MuiStartIcon sx={iconStyles} />
          </MuiIconButton>
        </MuiToolbar>
        <StyledList>
          <MenuSidebarItem
            open={open}
            href="/"
            text="Dashboard"
            icon={<MuiGridViewIcon sx={iconStyles} />}
            active
          />
          <MenuSidebarItem
            open={open}
            icon={<MuiGroupsOutlinedIcon sx={iconStyles} />}
            text="Teams"
            href="/teams"
          />
          <MenuSidebarItem
            open={open}
            href="/collaborators"
            text="Collaborators"
            icon={<MuiHandshakeIcon sx={iconStyles} />}
          />
        </StyledList>
        <Divider />
        <StyledList sx={{ flexGrow: 1 }}>
          <MenuSidebarItem
            open={open}
            href="/projects"
            text="Projects"
            icon={<MuiAssignmentOutlinedIcon sx={iconStyles} />}
          />
          <MenuSidebarItem
            open={open}
            href="/issues"
            text="Issues"
            icon={<MuiBugReportOutlinedIcon sx={iconStyles} />}
          />
          <MenuSidebarItem
            open={open}
            href="/tasks"
            text="Tasks"
            icon={<MuiTaskOutlinedIcon sx={iconStyles} />}
          />
        </StyledList>
        <MenuSidebarItem
          open={open}
          href="/settings"
          text="Settings"
          icon={<MuiSettingsOutlinedIcon sx={iconStyles} />}
        />
      </Drawer>
    </MuiBox>
  );
}

export default MenuSidebar;
