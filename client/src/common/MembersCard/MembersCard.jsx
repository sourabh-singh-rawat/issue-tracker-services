import { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import MuiGrid from "@mui/material/Grid";
import MuiTypography from "@mui/material/Typography";

import AvatarGroup from "../AvatarGroup";

import { setMembers } from "../../features/project/project.slice";
import { useGetProjectMembersQuery } from "../../features/project/project.api";

export default function MembersCard() {
  const { id } = useParams();
  const dispatch = useDispatch((store) => store.project.members.rows);
  const members = useSelector((store) => store.project.members);
  const getProjectMembersQuery = useGetProjectMembersQuery(id);

  useEffect(() => {
    if (getProjectMembersQuery.isSuccess)
      dispatch(setMembers(getProjectMembersQuery.data));
  }, [getProjectMembersQuery.isSuccess]);

  return (
    <Fragment>
      <MuiGrid container>
        <MuiGrid item xs={12}>
          <MuiTypography variant="body2" fontWeight={600}>
            People:
          </MuiTypography>
        </MuiGrid>
        <MuiGrid item sx={{ marginTop: "8px" }}>
          <AvatarGroup total={members.rowCount} members={members.rows} />
        </MuiGrid>
      </MuiGrid>
    </Fragment>
  );
}
