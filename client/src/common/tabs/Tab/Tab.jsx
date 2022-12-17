import { Chip } from "@mui/material";
import MuiTab from "@mui/material/Tab";
import { Fragment } from "react";

const Tab = (props) => {
  return (
    <MuiTab
      {...props}
      sx={{
        color: "text.main",
        textTransform: "none",
      }}
      disableRipple
    />
  );
};

export default Tab;
