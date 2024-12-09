import { useTheme } from "@mui/material";
import MuiTabs from "@mui/material/Tabs";

export default function Tabs(props) {
  const theme = useTheme();

  return (
    <MuiTabs
      {...props}
      sx={{
        px: theme.spacing(4),
        ".MuiButtonBase-root": {
          padding: 0,
          minWidth: "auto",
          opacity: 1,
          marginRight: theme.spacing(4),
          fontSize: theme.typography.body2,
          fontWeight: theme.typography.fontWeightMedium,
          color: theme.palette.text.secondary,
        },
      }}
    />
  );
}
