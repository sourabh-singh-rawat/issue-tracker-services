import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { styled } from "@mui/material/styles";
import MuiGrid from "@mui/material/Grid";
import MuiSelect from "@mui/material/Select";
import MuiMenuItem from "@mui/material/MenuItem";
import MuiAvatar from "@mui/material/Avatar";
import MuiFormControl from "@mui/material/FormControl";
import MuiTypography from "@mui/material/Typography";
import MuiSkeleton from "@mui/material/Skeleton";

import { useGetProjectMembersQuery } from "../../features/project/project.api";
import { setMembers } from "../../features/project/project.slice";

const StyledSelect = styled(MuiSelect)(({ theme }) => {
  return {
    "&.MuiOutlinedInput-root": {
      color: theme.palette.text.primary,
      fontSize: "14px",
      fontWeight: 500,
      textTransform: "capitalize",
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

const IssueAssigneeSelector = ({ projectId, value, loading, handleChange }) => {
  const dispatch = useDispatch();
  const members = useSelector((store) => store.project.members.rows);
  const getProjectMembers = useGetProjectMembersQuery(projectId);

  useEffect(() => {
    if (getProjectMembers.isSuccess) {
      dispatch(setMembers(getProjectMembers.data));
    }
  }, [getProjectMembers.data]);

  return (
    <Fragment>
      {loading ? (
        <MuiSkeleton />
      ) : (
        <MuiFormControl fullWidth>
          <StyledSelect
            size="small"
            value={!value ? 0 : value}
            onChange={handleChange}
          >
            {members.map(({ user_id, name, photo_url }) => {
              return (
                <MuiMenuItem
                  key={user_id}
                  value={user_id}
                  sx={{ fontSize: "14px", fontWeight: 500 }}
                >
                  <MuiGrid container columnSpacing={1}>
                    <MuiGrid item>
                      <MuiAvatar
                        sx={{ width: "24px", height: "24px" }}
                        src={photo_url}
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
                  <MuiAvatar sx={{ width: "24px", height: "24px" }} />
                </MuiGrid>
                <MuiGrid item>
                  <MuiTypography variant="body2" fontWeight={500}>
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
