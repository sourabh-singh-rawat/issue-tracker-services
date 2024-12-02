/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import MuiBox from "@mui/material/Box";

import { setMembers } from "../../../Lists/project.slice";
import { updateIssue } from "../../issue.slice";

interface IssueAssigneeProps {
  fullWidth: boolean;
}

export default function IssueAssignee({ fullWidth }: IssueAssigneeProps) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const issue = useSelector((store) => store.issue);
  const project = useSelector((store) => store.project);
  const getProjectMembers = useState(issue.info.projectId);
  const [updateIssueMutation, { isSuccess }] = useState();

  useEffect(() => {
    if (getProjectMembers.isSuccess) {
      dispatch(setMembers(getProjectMembers.data));
    }
  }, [getProjectMembers.data]);

  useEffect(() => {
    if (isSuccess) dispatch(setMessageBarOpen(true));
  }, [isSuccess]);

  const handleChange = async (e) => {
    const userId = e.target.value;
    await updateIssueMutation({ id, body: { assigneeId: userId } });
    dispatch(updateIssue({ assigneeId: userId }));
  };

  return (
    <MuiBox sx={{ marginTop: "8px" }}>
      <IssueAssigneeSelector
        fullWidth={fullWidth}
        handleChange={handleChange}
        isLoading={project.members.isLoading}
        projectMembers={project.members.rows}
        value={!issue.info.assigneeId ? "" : issue.info.assigneeId}
      />
    </MuiBox>
  );
}
