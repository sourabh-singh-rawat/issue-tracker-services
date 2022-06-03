import { Tabs } from "@mui/material";

const StyledTabs = (props) => {
  return (
    <Tabs
      {...props}
      textColor="inherit"
      sx={{
        borderRadius: 1,
        borderBottom: "1px solid #f5f7f9",
        "& .MuiTabs-indicator": {
          backgroundColor: "primary.main",
        },
        backgroundColor: "background.tabs",
      }}
    ></Tabs>
  );
};

export default StyledTabs;
