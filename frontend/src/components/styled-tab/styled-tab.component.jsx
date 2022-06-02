import { Tab } from "@mui/material";

const StyledTab = (props) => {
  return (
    <Tab
      {...props}
      sx={{
        textTransform: "none",
      }}
    ></Tab>
  );
};

export default StyledTab;
