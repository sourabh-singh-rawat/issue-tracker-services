// Modified version of AppBar from Material-UI

import { Box, AppBar, Typography, Toolbar } from "@mui/material";

const AppBarContainer = (props) => {
  const { children, element } = props;
  const appBarStyles = {
    bgcolor: "white",
    color: "black",
    boxShadow: "none",
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
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
          {element}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppBarContainer;
