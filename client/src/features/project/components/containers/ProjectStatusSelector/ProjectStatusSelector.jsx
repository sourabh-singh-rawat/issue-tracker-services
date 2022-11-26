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
      fontSize: "13px",
      fontWeight: 500,
      textTransform: "capitalize",
      borderRadius: "2em",
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
      fontSize: "13px",
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
  const isLoading = useSelector(
    (store) => store.project.options.status.isLoading
  );

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
        {isLoading ? (
          <CircularProgress />
        ) : (
          <StyledSelect
            name="status"
            size="small"
            value={value}
            onChange={handleChange}
            sx={{ height: variant === "dense" ? "28px" : "auto" }}
          >
            {projectStatus.map(({ id, name }) => {
              return (
                <StyledMenuItem key={id} value={id} disableRipple>
                  <span>{name}</span>
                </StyledMenuItem>
              );
            })}
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
