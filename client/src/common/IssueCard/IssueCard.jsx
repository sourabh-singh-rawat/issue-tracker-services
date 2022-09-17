import { Fragment } from "react";
import { useSelector } from "react-redux";

import Card from "@mui/material/Card";
import MuiButton from "@mui/material/Button";
import MuiRemoveIcon from "@mui/icons-material/Remove";

import MuiTypography from "@mui/material/Typography";
import { CardContent } from "@mui/material";

const IssueCard = ({
  title,
  color = "primary.oatmeal",
  bgColor,
  count,
  percentCount,
}) => {
  return (
    <Card
      sx={{
        marginTop: "10px",
        borderRadius: "12px",
        color: `${color}`,
        backgroundColor: `${bgColor}`,
        textTransform: "none",
        cursor: "pointer",
      }}
    >
      <CardContent>
        <MuiTypography
          variant="body2"
          sx={{ fontWeight: 600, paddingBottom: "4px" }}
        >
          {title}
        </MuiTypography>
        <MuiTypography variant="h4" fontWeight={600} fontFamily="Roboto Mono">
          {count}
        </MuiTypography>
        <MuiTypography
          variant="body2"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <MuiRemoveIcon />
          <span style={{ fontFamily: "Roboto Mono" }}>{percentCount}</span>%
          last week
        </MuiTypography>
      </CardContent>
    </Card>
  );
};

export default IssueCard;
