import { Box } from "@mui/material";

const StyledTabPanel = ({ children, selectedTab, index, ...otherProps }) => {
  return (
    <Box {...otherProps}>{selectedTab === index && <Box>{children}</Box>}</Box>
  );
};

export default StyledTabPanel;
