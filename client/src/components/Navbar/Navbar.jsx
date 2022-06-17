import {
  AppBar,
  Toolbar,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
  Button,
} from "@mui/material";
import { LogIn } from "react-feather";
import { signOutUser } from "../../firebase/auth";

const Navbar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: "100%",
        color: "white",
        bgcolor: "#1e212a",
        boxShadow: 1,
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar variant="dense" sx={{ display: "flex" }}>
        <Typography sx={{ flexGrow: 1 }}>Issue Tracker</Typography>
        <Button onClick={signOutUser} startIcon={<LogIn />}>
          <Typography variant="body2">Sign Out</Typography>
        </Button>
      </Toolbar>
      {/* signout button */}
    </AppBar>
  );
};

export default Navbar;
