import { Fragment } from "react";
import { theme } from "../../../../../config/mui.config";

import MuiGrid from "@mui/material/Grid";
import MuiSkeleton from "@mui/material/Skeleton";
import MuiTypography from "@mui/material/Typography";
import MuiPestControlIcon from "@mui/icons-material/PestControl";

const IssueCard = ({ title, count, isLoading, color, backgroundColor }) => {
  return (
    <Fragment>
      {isLoading ? (
        <MuiSkeleton
          variant="rectangular"
          height="90px"
          sx={{ borderRadius: "6px" }}
        />
      ) : (
        <MuiGrid
          container
          sx={{
            cursor: "pointer",
            padding: "16px",
            minHeight: "60px",
            border: `none`,
            borderRadius: "6px",
            transition: "250ms",
            backgroundColor: backgroundColor
              ? backgroundColor
              : theme.palette.common.white,

            border: `1px solid ${
              backgroundColor ? backgroundColor : theme.palette.grey[200]
            }`,
            ":hover": {
              backgroundColor: backgroundColor
                ? theme.palette.primary.dark
                : theme.palette.grey[100],
              border: `1px solid ${
                backgroundColor
                  ? theme.palette.primary.dark
                  : theme.palette.grey[100]
              }`,
              boxShadow: `0 1px 7px 0 ${theme.palette.grey[400]}`,
            },
          }}
        >
          <MuiGrid item xs={12} display="flex">
            <MuiTypography
              variant="body2"
              fontWeight={600}
              sx={{
                color: color ? color : theme.palette.text.primary,
                opacity: 0.6,
                textTransform: "capitalize",
                flexGrow: 1,
              }}
            >
              {title}:
            </MuiTypography>
            <MuiPestControlIcon
              sx={{
                opacity: color ? 0.6 : 0.2,
                color: color ? color : theme.palette.text.primary,
              }}
            />
          </MuiGrid>
          <MuiGrid item xs={12}>
            <MuiTypography
              variant="h4"
              sx={{
                fontFamily: "Roboto Mono",
                fontWeight: 500,
                color: color ? color : theme.palette.text.primary,
              }}
            >
              {count}
            </MuiTypography>
          </MuiGrid>
        </MuiGrid>
      )}
    </Fragment>
  );
};

export default IssueCard;
