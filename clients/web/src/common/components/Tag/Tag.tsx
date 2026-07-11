import React from "react";
import MuiGrid from "@mui/material/Grid";
import MuiTypograhy from "@mui/material/Typography";

interface TagProps {
  text: string;
}

export default function Tag({ text }: TagProps) {
  return (
    <MuiGrid container alignItems="center" gap={0.5}>
      <MuiGrid item>
        <MuiTypograhy variant="body2">{text}</MuiTypograhy>
      </MuiGrid>
    </MuiGrid>
  );
}
