import { Fragment } from "react";
import MuiSelect from "@mui/material/Select";
import MuiMenuItem from "@mui/material/MenuItem";
import MuiTypography from "@mui/material/Typography";
import MuiFormControl from "@mui/material/FormControl";
import MuiFormHelperText from "@mui/material/FormHelperText";

export default function Select({ title, items, helperText, ...otherProps }) {
  return (
    <Fragment>
      <MuiTypography
        variant="body1"
        fontWeight="bold"
        sx={{ paddingBottom: 1 }}
      >
        {title}
      </MuiTypography>
      <MuiFormControl fullWidth>
        <MuiSelect
          displayEmpty
          size="small"
          sx={{ color: "text.subtitle1", fontSize: "14px", fontWeight: 600 }}
          {...otherProps}
        >
          {items.map(({ code, message }, index) => (
            <MuiMenuItem
              key={code}
              value={code}
              sx={{
                color: "text.subtitle1",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              {message.toUpperCase()}
            </MuiMenuItem>
          ))}
        </MuiSelect>
      </MuiFormControl>
      <MuiFormHelperText>
        <MuiTypography component="span" variant="body2">
          {helperText}
        </MuiTypography>
      </MuiFormHelperText>
    </Fragment>
  );
}
