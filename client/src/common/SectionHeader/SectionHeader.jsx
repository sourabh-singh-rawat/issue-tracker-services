import MuiGrid from "@mui/material/Grid";
import MuiTypography from "@mui/material/Typography";

export default function SectionHeader({ title, subtitle, actionButton }) {
  return (
    <MuiGrid container gap="12px">
      <MuiGrid item xs={12} sx={{ display: "flex" }}>
        <MuiTypography
          variant="h4"
          sx={{ fontWeight: 600, paddingTop: "2px", flexGrow: 1 }}
        >
          {title}
        </MuiTypography>
        {actionButton}
      </MuiGrid>
      <MuiGrid item>
        <MuiTypography variant="body2" sx={{ color: "text.subtitle1" }}>
          {subtitle}
        </MuiTypography>
      </MuiGrid>
    </MuiGrid>
  );
}
