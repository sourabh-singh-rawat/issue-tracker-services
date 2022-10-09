import { useState } from "react";

import MuiGrid from "@mui/material/Grid";
import MuiCheckbox from "@mui/material/Checkbox";
import MuiTypography from "@mui/material/Typography";

export default function Task({ due_date }) {
  const [checked, setChecked] = useState(false);

  return (
    <MuiGrid container sx={{ display: "flex", alignItems: "baseline" }}>
      <MuiGrid item>
        <MuiCheckbox
          disableRipple
          checked={checked}
          onClick={() => {
            setChecked(!checked);
          }}
        />
      </MuiGrid>
      <MuiGrid item>
        <MuiTypography
          variant="body2"
          sx={{ textDecoration: checked && "line-through" }}
        >
          Run more than 12.8km in the next training session
        </MuiTypography>
      </MuiGrid>
      <MuiGrid item paddingLeft="8px">
        {"due_date"}
      </MuiGrid>
    </MuiGrid>
  );
}
