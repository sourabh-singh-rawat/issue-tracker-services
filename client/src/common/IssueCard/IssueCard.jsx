import MuiGrid from "@mui/material/Grid";
import MuiTypography from "@mui/material/Typography";

export default function IssueCard({ title, count }) {
  return (
    <MuiGrid item xs={2} sx={{ padding: "16px" }}>
      <MuiTypography
        variant="body2"
        fontWeight={600}
        sx={{ textTransform: "capitalize", color: "text.subtitle1" }}
      >
        {title}
      </MuiTypography>
      <MuiTypography
        variant="h5"
        sx={{ fontFamily: "Roboto Mono" }}
        fontWeight={400}
      >
        {count}
      </MuiTypography>
    </MuiGrid>
  );
}
