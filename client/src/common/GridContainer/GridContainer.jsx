import { styleld, useTheme } from "@mui/material/styles";
import MuiGrid from "@mui/material/Grid";

const Container = ({ children }) => {
  const theme = useTheme();

  return (
    <MuiGrid
      container
      sx={{
        border: `1px solid ${theme.palette.grey[200]}`,
        borderRadius: "4px",
        padding: "16px 24px",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      {children}
    </MuiGrid>
  );
};

export default Container;
