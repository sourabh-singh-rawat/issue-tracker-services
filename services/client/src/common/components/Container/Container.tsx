import React from "react";
import MuiGrid from "@mui/material/Grid";
import { useTheme } from "@mui/material";
import MuiTypography from "@mui/material/Typography";

interface Props {
  children?: React.ReactNode;
  title?: string;
}

export default function Container({ title, children }: Props) {
  const theme = useTheme();

  return (
    <MuiGrid
      container
      sx={{
        border: `1px solid ${theme.palette.divider}`,
        px: theme.spacing(1),
        py: theme.spacing(2),
        borderRadius: theme.shape.borderRadiusMedium,
      }}
    >
      <MuiGrid item xs={12}>
        <MuiTypography>{title}</MuiTypography>
      </MuiGrid>
      <MuiGrid item xs={12}>
        {children}
      </MuiGrid>
    </MuiGrid>
  );
}
