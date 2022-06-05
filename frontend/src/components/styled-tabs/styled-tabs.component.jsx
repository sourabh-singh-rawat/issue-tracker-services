import { Tabs } from "@mui/material";

const StyledTabs = (props) => {
  return (
    <Tabs
      {...props}
      textColor="inherit"
      sx={{
        color: "primary.main",
        borderBottom: "1px solid #f1f3f7",
        "& .Mui-selected": {
          color: "primary.main",
        },
        "& .MuiTabs-indicator": {
          backgroundColor: "primary.main",
        },
        backgroundColor: "background.main2",
      }}
    ></Tabs>
  );
};

export default StyledTabs;
