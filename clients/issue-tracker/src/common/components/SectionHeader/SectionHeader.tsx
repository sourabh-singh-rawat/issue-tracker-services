/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
import React from "react";

import MuiGrid from "@mui/material/Grid";
import MuiTypography from "@mui/material/Typography";

function SectionHeader({
  title,
  actionButton,
  noButton,
}: {
  title: string;
  actionButton: React.JSX.Element | null;
  noButton: boolean;
}) {
  return (
    <MuiGrid container>
      <MuiGrid sx={{ display: "flex" }} xs={12} item>
        <MuiTypography
          sx={{
            flexGrow: 1,
            fontWeight: 600,
          }}
          variant="h4"
        >
          {title}
        </MuiTypography>
        {actionButton}
      </MuiGrid>
    </MuiGrid>
  );
}

export default SectionHeader;
