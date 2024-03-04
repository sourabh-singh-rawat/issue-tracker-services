import React from "react";

import MuiBox from "@mui/material/Box";
import MuiGrid from "@mui/material/Grid";

export default function Dashboard() {
  return (
    <MuiBox sx={{ marginLeft: 3, marginRight: 3 }}>
      <MuiGrid spacing={3} container>
        <MuiGrid item></MuiGrid>
      </MuiGrid>
    </MuiBox>
  );
}
