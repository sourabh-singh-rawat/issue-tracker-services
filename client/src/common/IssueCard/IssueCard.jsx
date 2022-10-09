import { Fragment } from "react";

import MuiBox from "@mui/material/Box";
import MuiTypography from "@mui/material/Typography";

export default function IssueCard({ title, count }) {
  return (
    <MuiBox
      sx={{
        paddingLeft: "16px",
        paddingRight: "16px",
        paddingBottom: "8px",
        paddingTop: "8px",
      }}
    >
      <MuiTypography
        variant="body2"
        fontWeight={600}
        sx={{ textTransform: "capitalize", color: "text.subtitle1" }}
      >
        {title}:
      </MuiTypography>
      <MuiTypography
        variant="h5"
        sx={{ fontFamily: "Roboto Mono" }}
        fontWeight={400}
      >
        {count}
      </MuiTypography>
    </MuiBox>
  );
}
