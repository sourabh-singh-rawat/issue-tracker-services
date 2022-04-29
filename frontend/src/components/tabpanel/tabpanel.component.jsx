import { Box, Typography } from "@mui/material";

const TabPanel = ({ children, selectedTab, index, ...otherProps }) => {
  // Conditionally Rendering the TabPanel i.e. when index matches the selectedTab
  return (
    <div {...otherProps}>{selectedTab === index && <Box>{children}</Box>}</div>
  );
};

export default TabPanel;
