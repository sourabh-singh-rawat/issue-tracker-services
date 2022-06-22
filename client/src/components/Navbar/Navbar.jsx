import { LogIn } from "react-feather";
import { signOutUser } from "../../auth/auth";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { BugReport } from "@mui/icons-material";

const Navbar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: "100%",
        color: "white",
        boxShadow: 1,
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <AppBar sx={{ display: "flex" }}>
        <Toolbar sx={{ bgcolor: "background.appbar" }}>
          <Typography sx={{ flexGrow: 1 }}>
            <BugReport />
          </Typography>
          {/* signout button */}
          <Button onClick={signOutUser} startIcon={<LogIn />}>
            <Typography variant="body1">Sign Out</Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </AppBar>
  );
};

export default Navbar;
