import { useSelector } from "react-redux";

import MuiGrid from "@mui/material/Grid";
import MuiSelect from "@mui/material/Select";
import MuiMenuItem from "@mui/material/MenuItem";
import MuiSkeleton from "@mui/material/Skeleton";
import MuiTypography from "@mui/material/Typography";
import MuiFormControl from "@mui/material/FormControl";
import MuiFormHelperText from "@mui/material/FormHelperText";

const IssuePrioritySelector = ({
  title,
  value,
  variant,
  helperText,
  handleChange,
  loading,
}) => {
  const issuePriority = useSelector(
    (store) => store.issue.options.priority.rows
  );

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
            <MuiSelect
              name="priority"
              size="small"
              value={value ? value : issuePriority[0].priority}
              onChange={handleChange}
              sx={{
                color: "text.primary",
                fontSize: "14px",
                fontWeight: 600,
                textTransform: "capitalize",
                height: variant == "dense" ? "28px" : "auto",
              }}
              displayEmpty
            >
              {issuePriority.map(({ priority, message }) => {
                return (
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
                );
              })}
            </MuiSelect>
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

export default IssuePrioritySelector;
