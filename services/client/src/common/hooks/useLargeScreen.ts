import { useMediaQuery, useTheme } from "@mui/material";

export const useLargeScreen = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));

  return isLargeScreen;
};
