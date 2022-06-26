import { Tabs } from "@mui/material";

const StyledTabs = (props) => {
  return (
    <Tabs
      {...props}
      textColor="inherit"
      sx={{
        color: "primary.main",
        borderBottom: "1px solid #e3e4e6",
        ".MuiButtonBase-root": {
          padding: 0,
          marginRight: 4,
          borderWidth: 0,
          minWidth: "auto",
        },
        ".Mui-selected": {
          color: "primary.main",
        },
      }}
    />
  );
};

export default StyledTabs;
