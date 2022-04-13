import { Box, Typography } from "@mui/material";

const TabPanel = (props) => {
  const { children, selectedTab, index, ...other } = props;

  // Conditionally Rendering the TabPanel i.e. when index matches the selectedTab
  return (
    <div {...other}>
      {selectedTab === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

export default TabPanel;
