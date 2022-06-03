import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const StyledAppBar = (props) => {
  const { children, button } = props;
  const appBarStyles = {
    bgcolor: "transparent",
    color: "black",
    boxShadow: "none",
  };

  return (
    <AppBar position="static" sx={appBarStyles}>
      <Toolbar>
        <Typography
          variant="h5"
          fontWeight="bold"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          {children}
        </Typography>
        <Typography variant="body1">
          {button && <Link to={button.to}>{button.p}</Link>}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default StyledAppBar;
