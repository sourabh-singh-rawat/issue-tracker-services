import { Box, AppBar, Typography, Toolbar } from "@mui/material";

const AppBarContainer = (props) => {
  const { children, element } = props;
  const appBarStyles = {
    bgcolor: "white",
    color: "black",
    boxShadow: "none",
    borderBottom: "3px solid #f4f4f4",
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={appBarStyles}>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            {children}
          </Typography>
          {element}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppBarContainer;
