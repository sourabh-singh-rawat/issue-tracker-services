import { Fragment } from "react";

import { theme } from "../../../config/mui.config";
import { styled } from "@mui/material/styles";
import MuiGrid from "@mui/material/Grid";
import MuiSelect from "@mui/material/Select";
import MuiAvatar from "@mui/material/Avatar";
import MuiSkeleton from "@mui/material/Skeleton";
import MuiMenuItem from "@mui/material/MenuItem";
import MuiTypography from "@mui/material/Typography";
import MuiFormControl from "@mui/material/FormControl";
import Label from "../../utilities/Label";

const StyledSelect = styled(MuiSelect)(({ theme }) => {
  return {
    "&.MuiOutlinedInput-root": {
      color: theme.palette.grey[700],
      fontSize: "13px",
      fontWeight: 600,
      textTransform: "capitalize",
      backgroundColor: theme.palette.grey[50],
      borderRadius: "6px",
      "& fieldset": {
        border: `1px solid ${theme.palette.grey[300]}`,
      },
      "&:hover fieldset": {
        backgroundColor: "transparent",
        border: `1px solid ${theme.palette.grey[600]}`,
        transitionDuration: "250ms",
      },
    },
  };
});

const IssueAssigneeSelector = ({
  title,
  value,
  projectMembers,
  handleChange,
  isLoading,
}) => {
  return (
    <Fragment>
      {isLoading ? (
        <MuiGrid container>
          <MuiGrid item xs={12}>
            <MuiSkeleton />
          </MuiGrid>
        </MuiGrid>
      ) : (
        <MuiFormControl>
          {title && <Label title={title} />}
          <StyledSelect
            name="assigneeId"
            size="small"
            value={!value ? 0 : value}
            onChange={handleChange}
          >
            {projectMembers.map(({ memberId, name, photoUrl }) => {
              return (
                <MuiMenuItem
                  key={memberId}
                  value={memberId}
                  sx={{ fontSize: "13px", fontWeight: 600 }}
                >
                  <MuiGrid container columnSpacing={1}>
                    <MuiGrid item>
                      <MuiAvatar
                        sx={{ width: "20px", height: "20px" }}
                        src={photoUrl}
                      ></MuiAvatar>
                    </MuiGrid>
                    <MuiGrid item>{name}</MuiGrid>
                  </MuiGrid>
                </MuiMenuItem>
              );
            })}
            <MuiMenuItem value={0}>
              <MuiGrid
                container
                columnSpacing={1}
                sx={{ alignItems: "center" }}
              >
                <MuiGrid item>
                  <MuiAvatar
                    sx={{
                      width: "20px",
                      height: "20px",
                      backgroundColor: theme.palette.grey[500],
                    }}
                  />
                </MuiGrid>
                <MuiGrid item>
                  <MuiTypography
                    variant="body2"
                    sx={{ fontWeight: 600, fontSize: "13px" }}
                  >
                    Unassigned
                  </MuiTypography>
                </MuiGrid>
              </MuiGrid>
            </MuiMenuItem>
          </StyledSelect>
        </MuiFormControl>
      )}
    </Fragment>
  );
};

export default IssueAssigneeSelector;
