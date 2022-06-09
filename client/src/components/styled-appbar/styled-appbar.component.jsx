import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

const StyledAppBar = (props) => {
  const { children, button } = props;

  return (
    <AppBar
      position="static"
      sx={{
        width: "100%",
        color: "black",
        bgcolor: "white",
        boxShadow: 1,
      }}
    >
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
          {button && (
            <Link to={button.to}>
              <Button variant="contained" sx={{ textTransform: "none" }}>
                {button.p}
              </Button>
            </Link>
          )}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default StyledAppBar;
