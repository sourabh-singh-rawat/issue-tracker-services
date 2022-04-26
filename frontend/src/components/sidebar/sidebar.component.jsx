import { Outlet, Link } from "react-router-dom";

// MUI Theme
import {
  Box,
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export const drawerWidth = 240;

const Sidebar = () => {
  const drawerStyles = {
    width: drawerWidth,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: drawerWidth,
      boxSizing: "border-box",
      borderRight: "3px solid #f4f4f4",
    },
  };

  return (
    <>
      <Box>
        <Drawer anchor="left" variant="permanent" sx={drawerStyles}>
          <Toolbar></Toolbar>
          <List disablePadding>
            <Link to="/">
              <ListItem button>
                <ListItemText primary="Dashboard" />
              </ListItem>
            </Link>
            <Link to="/projects">
              <ListItem button>
                <ListItemText primary="Projects" />
              </ListItem>
            </Link>
            <Link to="/teams">
              <ListItem button>
                <ListItemText primary="Teams" />
              </ListItem>
            </Link>
            <Link to="/issues/detailed">
              <ListItem button>
                <ListItemText primary="Issues"></ListItemText>
              </ListItem>
            </Link>

            <Link to="/signup">
              <ListItem button>
                <ListItemText primary="Sign Up"></ListItemText>
              </ListItem>
            </Link>
          </List>
        </Drawer>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
    </>
  );
};

export default Sidebar;
