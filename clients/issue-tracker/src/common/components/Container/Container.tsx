import React from "react";
import Grid2 from "@mui/material/Grid2";
import { useTheme } from "@mui/material";
import MuiTypography from "@mui/material/Typography";

interface Props {
  children?: React.ReactNode;
  title?: string;
}

export default function Container({ title, children }: Props) {
  const theme = useTheme();

  return (
    <Grid2
      container
      sx={{
        border: `1px solid ${theme.palette.divider}`,
        px: theme.spacing(1),
        py: theme.spacing(2),
        borderRadius: theme.shape.borderRadiusMedium,
      }}
    >
      <Grid2 size={12}>
        <MuiTypography>{title}</MuiTypography>
      </Grid2>
      <Grid2 size={12}>
        {children}
      </Grid2>
    </Grid2>
  );
}
