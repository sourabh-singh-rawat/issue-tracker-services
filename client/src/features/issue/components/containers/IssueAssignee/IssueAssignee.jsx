import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import MuiBox from "@mui/material/Box";

import SelectAssignee from "../../../../../common/IssueAssigneeSelector/IssueAssigneeSelector";

import { useUpdateIssueMutation } from "../../../issue.api";
import { useGetProjectMembersQuery } from "../../../../project/project.api";
import { updateIssue } from "../../../issue.slice";
import { setMembers } from "../../../../project/project.slice";
import { setSnackbarOpen } from "../../../../snackbar.reducer";

const IssueAssignee = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const issue = useSelector((store) => store.issue);
  const project = useSelector((store) => store.project);
  const getProjectMembers = useGetProjectMembersQuery(issue.info.project_id);
  const [updateIssueMutation, { isSuccess }] = useUpdateIssueMutation();

  useEffect(() => {
    if (getProjectMembers.isSuccess) {
      dispatch(setMembers(getProjectMembers.data));
    }
  }, [getProjectMembers.data]);

  useEffect(() => {
    if (isSuccess) dispatch(setSnackbarOpen(true));
  }, [isSuccess]);

  const handleChange = async (e) => {
    const userId = e.target.value;
    await updateIssueMutation({ id, body: { assignee_id: userId } });
    dispatch(updateIssue({ assignee_id: userId }));
  };

  return (
    <MuiBox sx={{ marginTop: "10px" }}>
      <SelectAssignee
        value={!issue.info.assignee_id ? 0 : issue.info.assignee_id}
        members={project.members.rows}
        handleChange={handleChange}
      />
    </MuiBox>
  );
};

export default IssueAssignee;
