import { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MuiSelect from "@mui/material/Select";
import MuiMenuItem from "@mui/material/MenuItem";
import MuiTypography from "@mui/material/Typography";

import MuiGrid from "@mui/material/Grid";
import MuiFormControl from "@mui/material/FormControl";
import MuiFormHelperText from "@mui/material/FormHelperText";
import CircularProgress from "@mui/material/CircularProgress";

const ProjectStatusSelector = ({
  title,
  helperText,
  value,
  handleChange,
  variant,
}) => {
  const projectStatus = useSelector(
    (store) => store.project.options.status.rows
  );
  const loading = useSelector((store) => store.project.options.status.loading);

  return (
    <MuiGrid container sx={{ display: "flex" }}>
      {title && (
        <MuiGrid item xs={12}>
          <MuiTypography variant="body2" fontWeight="bold" paddingBottom={1}>
            {title}
          </MuiTypography>
        </MuiGrid>
      )}
      <MuiFormControl fullWidth>
        {loading ? (
          <CircularProgress />
        ) : (
          <MuiSelect
            displayEmpty
            name="status"
            size="small"
            value={value}
            onChange={handleChange}
            sx={{
              color: "text.primary",
              fontSize: "14px",
              fontWeight: 600,
              height: variant == "dense" ? "28px" : "auto",
              textTransform: "capitalize",
            }}
          >
            {projectStatus.map(({ status, message }) => (
              <MuiMenuItem
                key={status}
                value={status}
                sx={{
                  color: "text.primary",
                  fontSize: "14px",
                  fontWeight: 600,
                  textTransform: "capitalize",
                }}
              >
                <span>{message}</span>
              </MuiMenuItem>
            ))}
          </MuiSelect>
        )}
      </MuiFormControl>
      {helperText && (
        <MuiFormHelperText>
          <MuiTypography component="span" variant="body2">
            {helperText}
          </MuiTypography>
        </MuiFormHelperText>
      )}
    </MuiGrid>
  );
};

export default ProjectStatusSelector;
