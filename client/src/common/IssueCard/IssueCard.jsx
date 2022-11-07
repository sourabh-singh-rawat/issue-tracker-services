import { Fragment } from "react";
import { theme } from "../../app/mui.config";

import MuiBox from "@mui/material/Box";
import MuiSkeleton from "@mui/material/Skeleton";
import MuiTypography from "@mui/material/Typography";

const IssueCard = ({ title, count, loading }) => {
  return (
    <Fragment>
      {loading ? (
        <MuiSkeleton
          variant="rectangular"
          height="90px"
          sx={{ borderRadius: "6px" }}
        />
      ) : (
        <MuiBox
          sx={{
            cursor: "pointer",
            padding: "16px",
            minHeight: "60px",
            border: `1px solid ${theme.palette.outline.surfaceVariant}`,
            borderRadius: "6px",
            transition: "250ms",
            backgroundColor: "#f7f2f9",
            ":hover": {
              boxShadow: 4,
            },
          }}
        >
          <MuiTypography
            variant="body2"
            fontWeight={600}
            sx={{
              color: theme.palette.text.primary,
              textTransform: "capitalize",
            }}
          >
            {title}:
          </MuiTypography>
          <MuiTypography
            variant="h5"
            fontWeight={400}
            sx={{
              color: theme.palette.secondary.main,
              fontFamily: "Roboto Mono",
            }}
          >
            {count}
          </MuiTypography>
        </MuiBox>
      )}
    </Fragment>
  );
};

export default IssueCard;
