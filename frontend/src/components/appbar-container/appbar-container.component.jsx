import { AppBar, Typography, Toolbar } from "@mui/material";

const AppBarContainer = (props) => {
  const { children, element } = props;
  const appBarStyles = {
    bgcolor: "white",
    color: "black",
    boxShadow: "none",
    borderBottom: "3px solid #f4f4f4",
  };

  return (
    <AppBar position="static" sx={appBarStyles}>
      <Toolbar>
        <Typography variant="h5" component="div">
          {children}
        </Typography>

        {element}
      </Toolbar>
    </AppBar>
  );
};

export default AppBarContainer;
