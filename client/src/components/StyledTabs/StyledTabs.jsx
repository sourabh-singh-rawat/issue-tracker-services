import { Tabs } from "@mui/material";

const StyledTabs = (props) => {
  return (
    <Tabs
      {...props}
      textColor="inherit"
      sx={{
        color: "primary.main",
        borderBottom: "1px solid #e3e4e6",

        "& .Mui-selected": {
          color: "primary.main",
        },
        "& .MuiTabs-indicator": {
          backgroundColor: "primary.main",
          display: "flex",
          justifyContent: "center",
        },
      }}
    />
  );
};

export default StyledTabs;
