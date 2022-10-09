import { Fragment } from "react";
import { useSelector } from "react-redux";

import MuiSelect from "@mui/material/Select";
import MuiMenuItem from "@mui/material/MenuItem";
import MuiTypography from "@mui/material/Typography";
import MuiFormControl from "@mui/material/FormControl";
import MuiFormHelperText from "@mui/material/FormHelperText";

export default function IssuePrioritySelector({
  value,
  handleChange,
  title,
  helperText,
}) {
  const issuePriority = useSelector(
    (store) => store.issue.options.priority.result
  );

  return (
    <Fragment>
      <MuiTypography
        variant="body2"
        fontWeight="bold"
        sx={{ paddingBottom: 1 }}
      >
        {title}
      </MuiTypography>
      <MuiFormControl fullWidth>
        <MuiSelect
          name="priority"
          value={value}
          onChange={handleChange}
          size="small"
          displayEmpty
          sx={{
            color: "text.subtitle1",
            fontSize: "13px",
            fontWeight: 600,
          }}
        >
          {issuePriority.map(({ priority, message }) => (
            <MuiMenuItem
              key={priority}
              value={priority}
              sx={{
                color: "text.subtitle1",
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              {message.toUpperCase()}
            </MuiMenuItem>
          ))}
        </MuiSelect>
      </MuiFormControl>
      <MuiFormHelperText>
        <MuiTypography
          component="span"
          variant="body2"
          sx={{ fontWeight: 600 }}
        >
          {helperText}
        </MuiTypography>
      </MuiFormHelperText>
    </Fragment>
  );
}
