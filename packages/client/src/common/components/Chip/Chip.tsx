/* eslint-disable react/prop-types */
import React from "react";

import MuiChip from "@mui/material/Chip";
import { styled, useTheme } from "@mui/material/styles";

const StyledChip = styled(MuiChip)(() => ({ fontWeight: 600 }));

interface Props {
  label: any;
  color?: string;
}

export default function Chip({ label, color }: Props) {
  const theme = useTheme();
  const chipStyles = { color, padding: theme.spacing(1) };

  return (
    <StyledChip label={label} size="small" variant="outlined" sx={chipStyles} />
  );
}
