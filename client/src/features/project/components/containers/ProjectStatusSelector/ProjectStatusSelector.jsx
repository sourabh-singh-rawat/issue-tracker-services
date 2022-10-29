import { useSelector } from "react-redux";

import { styled } from "@mui/material";
import MuiGrid from "@mui/material/Grid";
import MuiSelect from "@mui/material/Select";
import MuiMenuItem from "@mui/material/MenuItem";
import MuiTypography from "@mui/material/Typography";
import MuiFormControl from "@mui/material/FormControl";
import MuiFormHelperText from "@mui/material/FormHelperText";
import CircularProgress from "@mui/material/CircularProgress";

const StyledSelect = styled(MuiSelect)(({ theme }) => {
  return {
    "&.MuiOutlinedInput-root": {
      color: theme.palette.text.primary,
      fontSize: "14px",
      fontWeight: 500,
      textTransform: "capitalize",
      borderRadius: "4px",
      backgroundColor: theme.palette.grey[200],
      "& fieldset": {
        border: `2px solid ${theme.palette.grey[200]}`,
      },
      "&:hover fieldset": {
        backgroundColor: "transparent",
        border: `2px solid ${theme.palette.grey[400]}`,
        transitionDuration: "250ms",
      },
    },
  };
});

const StyledMenuItem = styled(MuiMenuItem)(({ theme }) => {
  return {
    "&.MuiMenuItem-root": {
      color: "text.primary",
      fontSize: "14px",
      fontWeight: 500,
      textTransform: "capitalize",
      ":hover": {
        backgroundColor: "action.hover",
      },
    },
    "&.Mui-selected": {
      color: theme.palette.primary.main,
    },
  };
});

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
    <MuiGrid container>
      {title && (
        <MuiGrid item xs={12}>
          <MuiTypography
            variant="body2"
            sx={{ fontWeight: 500, paddingBottom: 1 }}
          >
            {title}
          </MuiTypography>
        </MuiGrid>
      )}
      <MuiFormControl fullWidth>
        {loading ? (
          <CircularProgress />
        ) : (
          <StyledSelect
            name="status"
            size="small"
            value={value}
            onChange={handleChange}
            sx={{ height: variant == "dense" ? "28px" : "auto" }}
            displayEmpty
          >
            {projectStatus.map(({ status, message }) => (
              <StyledMenuItem key={status} value={status} disableRipple>
                <span>{message}</span>
              </StyledMenuItem>
            ))}
          </StyledSelect>
        )}
      </MuiFormControl>
      {helperText && (
        <MuiFormHelperText>
          <MuiTypography component="span" sx={{ fontSize: "13px" }}>
            {helperText}
          </MuiTypography>
        </MuiFormHelperText>
      )}
    </MuiGrid>
  );
};

export default ProjectStatusSelector;
