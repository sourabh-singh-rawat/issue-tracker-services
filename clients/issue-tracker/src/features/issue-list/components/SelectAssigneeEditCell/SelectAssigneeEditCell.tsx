/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useGridApiContext } from "@mui/x-data-grid";

import IssueAssigneeSelector from "../../../../common/IssueAssigneeSelector";

import { useUpdateIssueMutation } from "../../../issue/issue.api";
import { useGetProjectMembersQuery } from "../../../project/project.api";

import { updateIssue } from "../../../issue/issue.slice";
import { setMessageBarOpen } from "../../../message-bar/message-bar.slice";

// eslint-disable-next-line object-curly-newline
function SelectAssigneeEditCell({ id, value, field, ...rest }) {
  const dispatch = useDispatch();
  const apiRef = useGridApiContext();
  const [updateIssueMutation, { isSuccess }] = useUpdateIssueMutation();
  const { projectId } = rest.row;
  const [projectMembers, setProjectMembers] = useState([]);
  const getProjectMembersQuery = useGetProjectMembersQuery(projectId);

  useEffect(() => {
    if (getProjectMembersQuery.isSuccess) {
      // eslint-disable-next-line nonblock-statement-body-position
      setProjectMembers(getProjectMembersQuery.data.rows);
    }
  }, [getProjectMembersQuery.data]);

  const handleChange = async (e) => {
    apiRef.current.startCellEditMode({ id, field });
    const isValid = await apiRef.current.setEditCellValue({
      id,
      field,
      value: e.target.value,
    });
    await updateIssueMutation({ id, body: { assigneeId: e.target.value } });
    dispatch(updateIssue({ assigneeId: e.target.value }));

    if (isValid) apiRef.current.stopCellEditMode({ id, field });
  };

  useEffect(() => {
    if (isSuccess) dispatch(setMessageBarOpen(true));
  }, [isSuccess]);

  return (
    <IssueAssigneeSelector
      handleChange={handleChange}
      isLoading={getProjectMembersQuery.isLoading}
      projectMembers={projectMembers}
      value={!value ? 0 : value}
      fullWidth
    />
  );
}

export default SelectAssigneeEditCell;
