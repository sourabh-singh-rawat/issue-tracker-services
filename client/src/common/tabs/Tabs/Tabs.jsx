import MuiTabs from "@mui/material/Tabs";
import { theme } from "../../../config/mui.config";

const Tabs = (props) => {
  return (
    <MuiTabs
      {...props}
      textColor="inherit"
      sx={{
        borderBottom: `1px solid ${theme.palette.grey[300]}`,

        ".MuiButtonBase-root": {
          padding: 0,
          opacity: 1,
          minWidth: "auto",
          marginRight: 4,
          color: `${theme.palette.grey[700]}`,
          fontWeight: 600,
        },
        ".Mui-selected": {
          color: theme.palette.primary.main,
        },
      }}
    />
  );
};

export default Tabs;
