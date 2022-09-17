import { Fragment } from "react";
import { useSelector } from "react-redux";
import MuiSelect from "@mui/material/Select";
import MuiMenuItem from "@mui/material/MenuItem";
import MuiTypography from "@mui/material/Typography";
import MuiFormControl from "@mui/material/FormControl";
import MuiFormHelperText from "@mui/material/FormHelperText";

const IssueStatusSelector = ({ value, handleChange, title, helperText }) => {
  const issueStatus = useSelector((store) => store.issue.options.status.result);

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
          name="status"
          value={value ? value : issueStatus[0].status}
          onChange={handleChange}
          size="small"
          displayEmpty
          sx={{
            fontSize: "13px",
            fontWeight: "bold",
            color: "text.subtitle1",
          }}
        >
          {issueStatus.map(({ status, message }) => {
            return (
              <MuiMenuItem
                key={message}
                value={status}
                sx={{
                  fontSize: "13px",
                  fontWeight: "bold",
                  color: "text.subtitle1",
                }}
              >
                {message.toUpperCase()}
              </MuiMenuItem>
            );
          })}
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
};

export default IssueStatusSelector;
