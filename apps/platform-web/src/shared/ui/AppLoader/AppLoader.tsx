import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@mui/material/styles";

interface AppLoaderProps {
  size?: number;
  color?: "inherit" | "primary" | "secondary" | "error" | "info" | "success" | "warning";
}

export function AppLoader({ size = 4, color = "primary" }: AppLoaderProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress size={theme.spacing(size)} color={color} />
    </Box>
  );
}
