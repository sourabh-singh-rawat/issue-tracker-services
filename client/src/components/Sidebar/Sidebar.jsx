import { Outlet, Link } from "react-router-dom";

// MUI Theme
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import {
  Box,
  List,
  Divider,
  Toolbar,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  CssBaseline,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
  Menu,
  ArrowLeft,
  Grid,
  Users,
  AlertTriangle,
  FolderPlus,
  LogIn,
} from "react-feather";
import { useState } from "react";
import StyledSnackbar from "../StyledSnackBar/StyledSnackBar";

export const drawerWidth = 240;

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
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  // styles
  const listItemTextStyles = { opacity: open ? 1 : 0 };
  const listItemIconStyles = {
    minWidth: 0,
    mr: open ? 1.5 : "auto",
    justifyContent: "center",
  };
  const listItemButtonStyles = {
    minHeight: 48,
    px: (open && 4) || (!open && 2.5),
  };

  return (
    <>
      <Box sx={{ diplay: "flex" }}>
        <CssBaseline />
        {/* drawer */}
        <Drawer variant="permanent" open={open}>
          <Toolbar>
            {/* hamburger */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <Menu />
            </IconButton>
            <IconButton
              onClick={handleDrawerClose}
              sx={{ opacity: open ? 1 : 0 }} // important fix for chevronLeft icon
            >
              <ArrowLeft />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>
            {/* dashboard button */}
            <ListItem disablePadding sx={{ display: "block" }}>
              <Link to="/">
                <ListItemButton sx={listItemButtonStyles}>
                  <ListItemIcon sx={listItemIconStyles}>
                    <Grid />
                  </ListItemIcon>
                  <ListItemText primary={"Dashboard"} sx={listItemTextStyles} />
                </ListItemButton>
              </Link>
            </ListItem>
            {/* projects button */}
            <ListItem disablePadding sx={{ display: "block" }}>
              <Link to="/projects/all">
                <ListItemButton sx={listItemButtonStyles}>
                  <ListItemIcon sx={listItemIconStyles}>
                    <FolderPlus />
                  </ListItemIcon>
                  <ListItemText
                    primary="Projects"
                    sx={listItemTextStyles}
                  ></ListItemText>
                </ListItemButton>
              </Link>
            </ListItem>
            {/* teams button */}
            <ListItem disablePadding sx={{ display: "block" }}>
              <Link to="/teams">
                <ListItemButton sx={listItemButtonStyles}>
                  <ListItemIcon sx={listItemIconStyles}>
                    <Users />
                  </ListItemIcon>
                  <ListItemText
                    primary="Teams"
                    sx={listItemTextStyles}
                  ></ListItemText>
                </ListItemButton>
              </Link>
            </ListItem>
            {/* issues button */}
            <ListItem disablePadding sx={{ display: "block" }}>
              <Link to="/issues">
                <ListItemButton sx={listItemButtonStyles}>
                  <ListItemIcon sx={listItemIconStyles}>
                    <AlertTriangle />
                  </ListItemIcon>
                  <ListItemText primary={"Issues"} sx={listItemTextStyles} />
                </ListItemButton>
              </Link>
            </ListItem>
            {/* signup button */}
            <ListItem disablePadding sx={{ display: "block" }}>
              <Link to="/signup">
                <ListItemButton sx={listItemButtonStyles}>
                  <ListItemIcon sx={listItemIconStyles}>
                    <LogIn />
                  </ListItemIcon>
                  <ListItemText primary={"Sign Up"} sx={listItemTextStyles} />
                </ListItemButton>
              </Link>
            </ListItem>
          </List>
        </Drawer>
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>

      <StyledSnackbar />
    </>
  );
};

export default Sidebar;
