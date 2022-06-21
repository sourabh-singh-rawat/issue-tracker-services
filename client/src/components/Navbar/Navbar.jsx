import { LogIn } from "react-feather";
import { signOutUser } from "../../auth/auth";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";

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
        {/* signout button */}
        <Button onClick={signOutUser} startIcon={<LogIn />}>
          <Typography variant="body2">Sign Out</Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
