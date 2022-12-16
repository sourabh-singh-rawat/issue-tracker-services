import { useState } from "react";

import { styled, useTheme } from "@mui/material/styles";
import MuiBox from "@mui/material/Box";
import MuiList from "@mui/material/List";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import MuiToolbar from "@mui/material/Toolbar";
import MuiIconButton from "@mui/material/IconButton";

import MuiStartIcon from "@mui/icons-material/Start";
import MuiTaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import MuiGridViewIcon from "@mui/icons-material/GridView";
import MuiHandshakeIcon from "@mui/icons-material/HandshakeOutlined";
import MuiGroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import MuiSettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MuiBugReportOutlinedIcon from "@mui/icons-material/BugReportOutlined";
import MuiAssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";

import Navbar from "../Navbar";
import MenuSidebarItem from "../MenuSidebarItem";

export const drawerWidth = 220;

const openedMixin = (theme) => ({
  width: drawerWidth,
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  "& .MuiPaper-root": {
    border: "none",
    backgroundColor: theme.palette.grey[100],
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

const StyledList = styled(MuiList)(({ theme }) => {
  return {
    "&.MuiList-root": { padding: 0 },
  };
});

const Sidebar = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const toggleDrawerOpen = () => setOpen(!open);

  const iconStyles = { width: "20px" };

  return (
    <MuiBox sx={{ display: "flex" }}>
      <Drawer variant="permanent" open={open}>
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
            onClick={toggleDrawerOpen}
            sx={{
              padding: "4px 6px",
              transform: open && "rotate(180deg)",
              borderRadius: "4px",
              "&:hover": {
                backgroundColor: theme.palette.grey[300],
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
            to="/"
            text="Dashboard"
            icon={<MuiGridViewIcon sx={iconStyles} />}
          />
          {[
            {
              to: "/projects",
              text: "Projects",
              icon: <MuiAssignmentOutlinedIcon sx={iconStyles} />,
            },
            {
              to: "/teams",
              text: "Teams",
              icon: <MuiGroupsOutlinedIcon sx={iconStyles} />,
            },
            {
              to: "/collaborators",
              text: "People",
              icon: <MuiHandshakeIcon sx={iconStyles} />,
            },
          ].map(({ text, ...otherProps }) => {
            return (
              <MenuSidebarItem
                key={text}
                open={open}
                text={text}
                {...otherProps}
              />
            );
          })}
        </StyledList>
        <Divider />
        <StyledList>
          {[
            {
              to: "/issues",
              text: "Issues",
              icon: <MuiBugReportOutlinedIcon sx={iconStyles} />,
            },
            {
              to: "/tasks",
              text: "Tasks",
              icon: <MuiTaskOutlinedIcon sx={iconStyles} />,
            },
            {
              to: "/settings",
              text: "Settings",
              icon: <MuiSettingsOutlinedIcon sx={iconStyles} />,
            },
          ].map(({ text, ...otherProps }) => {
            return (
              <MenuSidebarItem
                key={text}
                open={open}
                text={text}
                {...otherProps}
              />
            );
          })}
        </StyledList>
      </Drawer>
    </MuiBox>
  );
};

export default Sidebar;
