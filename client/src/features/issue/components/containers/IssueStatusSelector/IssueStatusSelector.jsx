import { useSelector } from "react-redux";

import { styled } from "@mui/material/styles";
import MuiGrid from "@mui/material/Grid";
import MuiSelect from "@mui/material/Select";
import MuiSkeleton from "@mui/material/Skeleton";
import MuiMenuItem from "@mui/material/MenuItem";
import MuiTypography from "@mui/material/Typography";
import MuiFormControl from "@mui/material/FormControl";
import MuiFormHelperText from "@mui/material/FormHelperText";

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

const IssueStatusSelector = ({
  title,
  value,
  variant,
  helperText,
  handleChange,
  isLoading,
}) => {
  const issueStatus = useSelector((store) => store.issue.options.status.rows);

  return (
    <MuiGrid container>
      {title && (
        <MuiGrid item xs={12}>
          {isLoading ? (
            <MuiSkeleton width="20%" />
          ) : (
            <MuiTypography
              variant="body2"
              fontWeight={500}
              sx={{ paddingBottom: 1 }}
            >
              {title}
            </MuiTypography>
          )}
        </MuiGrid>
      )}
      <MuiGrid item xs={12}>
        {isLoading ? (
          <MuiSkeleton />
        ) : (
          <MuiFormControl fullWidth>
            <StyledSelect
              name="status"
              size="small"
              value={value}
              onChange={handleChange}
              sx={{
                color: "text.primary",
                fontSize: "13px",
                fontWeight: 500,
                height: variant === "dense" ? "28px" : "auto",
                textTransform: "capitalize",
              }}
              displayEmpty
            >
              {issueStatus.map(({ id, name }) => {
                return (
                  <MuiMenuItem
                    key={id}
                    value={id}
                    sx={{
                      color: "text.primary",
                      fontSize: "13px",
                      fontWeight: 500,
                      textTransform: "capitalize",
                    }}
                  >
                    {name}
                  </MuiMenuItem>
                );
              })}
            </StyledSelect>
          </MuiFormControl>
        )}
      </MuiGrid>
      <MuiGrid item xs={12}>
        {helperText && isLoading ? (
          <MuiSkeleton width="50%" height="75%" />
        ) : (
          <MuiFormHelperText>
            <MuiTypography component="span" sx={{ fontSize: "13px" }}>
              {helperText}
            </MuiTypography>
          </MuiFormHelperText>
        )}
      </MuiGrid>
    </MuiGrid>
  );
};

export default IssueStatusSelector;
