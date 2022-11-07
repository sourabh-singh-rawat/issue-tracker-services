import { useTheme } from "@mui/material/styles";

import MuiTabs from "@mui/material/Tabs";

const Tabs = (props) => {
  const theme = useTheme();
  return (
    <MuiTabs
      {...props}
      textColor="inherit"
      sx={{
        borderTop: `1px solid ${theme.palette.grey[300]}`,
        borderBottom: `1px solid ${theme.palette.grey[300]}`,

        ".MuiButtonBase-root": {
          padding: 0,
          opacity: 1,
          minWidth: "auto",
          marginRight: 4,
          color: `${theme.palette.text.secondary}`,
          fontWeight: 600,
        },
        ".Mui-selected": {
          color: `primary.main`,
        },
      }}
    />
  );
};

export default Tabs;
