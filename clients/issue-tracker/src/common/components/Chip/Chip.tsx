import React from "react";

import MuiChip from "@mui/material/Chip";
import { SxProps, styled, useTheme } from "@mui/material/styles";
import { Theme } from "@emotion/react";

const StyledChip = styled(MuiChip)(() => ({ fontWeight: 600 }));

interface Props {
  label: string;
  color?: string;
}

export default function Chip({ label, color }: Props) {
  const theme = useTheme();
  const chipStyles: SxProps<Theme> = {
    color,
    borderRadius: theme.shape.borderRadiusMedium,
    border: `1px solid ${color}`,
  };

  return (
    <StyledChip label={label} size="small" variant="outlined" sx={chipStyles} />
  );
}
