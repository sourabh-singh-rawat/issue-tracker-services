import MuiGrid from "@mui/material/Grid";
import MuiCheckbox from "@mui/material/Checkbox";
import MuiTypography from "@mui/material/Typography";

export default function Task({ due_date, description, completed }) {
  return (
    <MuiGrid
      container
      sx={{
        alignItems: "baseline",
        borderRadius: "4px",
        border: "1px solid #E3E4E6",
      }}
    >
      <MuiGrid item>
        <MuiCheckbox disableRipple checked={completed} />
      </MuiGrid>
      <MuiGrid item>
        <MuiTypography
          variant="body2"
          sx={{ textDecoration: completed && "line-through" }}
        >
          {description}
        </MuiTypography>
      </MuiGrid>
      <MuiGrid item paddingLeft="8px">
        <MuiTypography variant="body2">{due_date}</MuiTypography>
      </MuiGrid>
    </MuiGrid>
  );
}
