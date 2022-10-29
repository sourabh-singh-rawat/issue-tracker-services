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

const IssueStatusSelector = ({
  title,
  value,
  variant,
  helperText,
  handleChange,
  loading,
}) => {
  const issueStatus = useSelector((store) => store.issue.options.status.rows);

  return (
    <MuiGrid container>
      {title && (
        <MuiGrid item xs={12}>
          {loading ? (
            <MuiSkeleton width="20%" />
          ) : (
            <MuiTypography
              variant="body2"
              fontWeight="bold"
              sx={{ paddingBottom: 1 }}
            >
              {title}
            </MuiTypography>
          )}
        </MuiGrid>
      )}
      <MuiGrid item xs={12}>
        {loading ? (
          <MuiSkeleton />
        ) : (
          <MuiFormControl fullWidth>
            <StyledSelect
              name="status"
              size="small"
              value={value ? value : issueStatus[0].status}
              onChange={handleChange}
              sx={{
                color: "text.primary",
                fontSize: "14px",
                fontWeight: 600,
                height: variant === "dense" ? "28px" : "auto",
                textTransform: "capitalize",
              }}
              displayEmpty
            >
              {issueStatus.map(({ status, message }) => {
                return (
                  <MuiMenuItem
                    key={message}
                    value={status}
                    sx={{
                      color: "text.primary",
                      fontSize: "14px",
                      fontWeight: 600,
                      textTransform: "capitalize",
                    }}
                  >
                    {message}
                  </MuiMenuItem>
                );
              })}
            </StyledSelect>
          </MuiFormControl>
        )}
      </MuiGrid>
      <MuiGrid item xs={12}>
        {helperText && loading ? (
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
