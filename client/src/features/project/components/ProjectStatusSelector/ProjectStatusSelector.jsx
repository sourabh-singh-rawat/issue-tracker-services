import { Fragment } from "react";
import { useSelector } from "react-redux";
import MuiSelect from "@mui/material/Select";
import MuiMenuItem from "@mui/material/MenuItem";
import MuiTypography from "@mui/material/Typography";
import MuiFormControl from "@mui/material/FormControl";
import MuiFormHelperText from "@mui/material/FormHelperText";
import MuiCircleIcon from "@mui/icons-material/Circle";
import { CircularProgress } from "@mui/material";

const ProjectStatusSelector = ({ value, handleChange, title, helperText }) => {
  const projectStatus = useSelector(
    (store) => store.project.options.status.result
  );
  const loading = useSelector((store) => store.project.options.status.loading);

  return (
    <Fragment>
      <MuiTypography variant="body2" fontWeight="bold" paddingBottom={1}>
        {title}
      </MuiTypography>
      <MuiFormControl fullWidth>
        {loading ? (
          <CircularProgress />
        ) : (
          <MuiSelect
            name="status"
            value={value}
            onChange={handleChange}
            size="small"
            displayEmpty
            sx={{ color: "text.subtitle1", fontSize: "13px", fontWeight: 600 }}
          >
            {projectStatus.map(({ status, message, color }) => (
              <MuiMenuItem
                key={status}
                value={status}
                sx={{
                  color: "text.subtitle1",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                {/* <MuiCircleIcon
                  sx={{ width: "0.5em", color: `${color}`, height: "100%" }}
                /> */}
                <span>{message.toUpperCase()}</span>
              </MuiMenuItem>
            ))}
          </MuiSelect>
        )}
      </MuiFormControl>
      <MuiFormHelperText>
        <MuiTypography component="span" variant="body2">
          {helperText}
        </MuiTypography>
      </MuiFormHelperText>
    </Fragment>
  );
};

export default ProjectStatusSelector;
