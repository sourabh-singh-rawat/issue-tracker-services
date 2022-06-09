import { Tab } from "@mui/material";

const StyledTab = (props) => {
  return (
    <Tab
      {...props}
      sx={{
        color: "primary.text3",
        fontSize: "inherit",
        textTransform: "none",
      }}
    />
  );
};

export default StyledTab;
