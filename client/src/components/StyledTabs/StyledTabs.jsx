import { Tabs } from "@mui/material";

const StyledTabs = (props) => {
  return (
    <Tabs
      {...props}
      textColor="inherit"
      fontSize="inherit"
      sx={{
        borderRadius: 1,
        color: "primary.main",
        borderBottom: "2px solid #f1f3f7",
        // backgroundColor: "background.main3",
        "& .Mui-selected": {
          color: "primary.main",
        },
        "& .MuiTabs-indicator": {
          backgroundColor: "primary.main",
        },
      }}
    />
  );
};

export default StyledTabs;
