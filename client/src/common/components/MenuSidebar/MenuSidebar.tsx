import React, { useState } from "react";

import MuiBox from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiGridViewIcon from "@mui/icons-material/GridView";
import MuiGroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import MuiHandshakeIcon from "@mui/icons-material/HandshakeOutlined";
import MuiIconButton from "@mui/material/IconButton";
import MuiList from "@mui/material/List";
import MuiSettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MuiStartIcon from "@mui/icons-material/Start";
import MuiToolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import theme from "../../app/theme.config";

import MenuSidebarItem from "../MenuSidebarItem";
import Navbar from "../Navbar";

export const drawerWidth = 220;

const openedMixin = () => ({
  width: drawerWidth,
  overflowX: "hidden",
});

const closedMixin = () => ({
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  "& .MuiPaper-root": {
    border: "none",
    backgroundColor: theme.palette.common.white,
    borderRight: `1px solid ${theme.palette.grey[1200]}`,
  },
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const StyledList = styled(MuiList)(() => ({
  "&.MuiList-root": { padding: 0 },
}));

function MenuSidebar() {
  const [open, setOpen] = useState(false);
  const toggleDrawerOpen = () => setOpen(!open);

  const iconStyles = { width: "20px" };

  return (
    <MuiBox>
      <Drawer open={open} variant="permanent">
        <Navbar />
        <MuiToolbar variant="dense" />
        <MuiToolbar
          sx={
            !open
              ? { justifyContent: "center" }
              : { marginRight: 1, justifyContent: "right" }
          }
          disableGutters
        >
          <MuiIconButton
            sx={{
              padding: "4px 6px",
              transform: open && "rotate(180deg)",
              borderRadius: "4px",
              color: theme.palette.grey[900],
              "&:hover": {
                backgroundColor: theme.palette.grey[1400],
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
