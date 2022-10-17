import { Fragment } from "react";
import { useSelector } from "react-redux";

import MuiGrid from "@mui/material/Grid";
import MuiSelect from "@mui/material/Select";
import MuiMenuItem from "@mui/material/MenuItem";
import MuiTypography from "@mui/material/Typography";
import MuiFormControl from "@mui/material/FormControl";
import MuiFormHelperText from "@mui/material/FormHelperText";

const IssuePrioritySelector = ({
  value,
  handleChange,
  title,
  helperText,
  variant,
}) => {
  const issuePriority = useSelector(
    (store) => store.issue.options.priority.rows
  );

  return (
    <MuiGrid container sx={{ display: "flex" }}>
      {title && (
        <MuiTypography
          variant="body2"
          fontWeight="bold"
          sx={{ paddingBottom: 1 }}
        >
          {title}
        </MuiTypography>
      )}
      <MuiFormControl fullWidth>
        <MuiSelect
          name="priority"
          value={value}
          onChange={handleChange}
          size="small"
          displayEmpty
          sx={{
            color: "text.primary",
            fontSize: "14px",
            fontWeight: 600,
            textTransform: "capitalize",
            height: variant == "dense" ? "28px" : "auto",
          }}
        >
          {issuePriority.map(({ priority, message }) => (
            <MuiMenuItem
              key={priority}
              value={priority}
              sx={{
                color: "text.primary",
                fontSize: "14px",
                fontWeight: 600,
                textTransform: "capitalize",
              }}
            >
              {message}
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
    </MuiGrid>
  );
};

export default IssuePrioritySelector;
