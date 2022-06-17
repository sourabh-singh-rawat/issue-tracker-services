import { Tab } from "@mui/material";

const StyledTab = (props) => {
  return (
    <Tab
      {...props}
      sx={{
        color: "text.main",
        fontSize: "14px",
        textTransform: "none",
      }}
      disableRipple
    />
  );
};

export default StyledTab;
