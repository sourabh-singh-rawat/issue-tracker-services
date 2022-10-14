import { Fragment } from "react";

import MuiBox from "@mui/material/Box";
import MuiTypography from "@mui/material/Typography";
import { Skeleton } from "@mui/material";

export default function IssueCard({ title, count, loading }) {
  return (
    <Fragment>
      {loading ? (
        <Skeleton
          variant="rectangular"
          height="90px"
          sx={{ borderRadius: "8px" }}
        />
      ) : (
        <MuiBox
          sx={{
            cursor: "pointer",
            padding: "16px",
            minHeight: "60px",
            border: "1px solid #E3E4E6",
            borderRadius: "8px",
            transition: "500ms",
            ":hover": {
              border: "1px solid #CABBA5",
              boxShadow: 4,
            },
          }}
        >
          <MuiTypography
            variant="body2"
            fontWeight={600}
            sx={{
              color: "text.primary",
              textTransform: "capitalize",
            }}
          >
            {title}:
          </MuiTypography>
          <MuiTypography
            variant="h5"
            fontWeight={400}
            sx={{ color: "secondary.main", fontFamily: "Noto Serif Telgu" }}
          >
            {count}
          </MuiTypography>
        </MuiBox>
      )}
    </Fragment>
  );
}
