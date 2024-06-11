import React from "react";

import MuiGrid from "@mui/material/Grid";

export default function Settings({ children }) {
  return (
    <MuiGrid gap="40px" container>
      {children}
    </MuiGrid>
  );
}
