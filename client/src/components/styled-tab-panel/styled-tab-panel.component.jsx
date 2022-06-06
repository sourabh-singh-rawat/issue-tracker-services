import { Box } from "@mui/material";

const StyledTabPanel = ({ children, selectedTab, index, ...otherProps }) => {
  // Conditionally Rendering the TabPanel i.e. when index matches the selectedTab
  return (
    <div {...otherProps}>
      {selectedTab === index && (
        <Box
          sx={{
            marginTop: 2,
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
};

export default StyledTabPanel;
