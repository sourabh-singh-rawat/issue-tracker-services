import { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import MuiGrid from "@mui/material/Grid";

import AvatarGroup from "../../groups/AvatarGroup";

import { useGetProjectMembersQuery } from "../../../features/project/api/project.api";

import { setMembers } from "../../../features/project/slice/project.slice";

const MembersCard = () => {
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
        <MuiGrid item sx={{ marginTop: "8px" }}>
          <AvatarGroup total={members.rowCount} members={members.rows} />
        </MuiGrid>
      </MuiGrid>
    </Fragment>
  );
};

export default MembersCard;
