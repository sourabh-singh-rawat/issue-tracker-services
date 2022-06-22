import { Tab } from "@mui/material";

const StyledTab = (props) => {
  return (
    <Tab
      {...props}
      iconPosition="start"
      sx={{
        color: "text.main",
        textTransform: "none",
        fontSize: "16px",
        fontWeight: "bold",
      }}
      disableRipple
    />
  );
};

export default StyledTab;
