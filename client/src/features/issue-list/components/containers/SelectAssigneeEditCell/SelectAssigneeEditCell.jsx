import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useGridApiContext } from "@mui/x-data-grid";

import IssueAssigneeSelector from "../../../../../common/IssueAssigneeSelector";

import { useUpdateIssueMutation } from "../../../../issue/issue.api";
import { updateIssue } from "../../../../issue/issue.slice";
import { useGetProjectMembersQuery } from "../../../../project/project.api";
import { setMembers } from "../../../../project/project.slice";
import { setSnackbarOpen } from "../../../../snackbar.reducer";

const SelectAssigneeEditCell = ({ id, value, field, ...rest }) => {
  const dispatch = useDispatch();
  const apiRef = useGridApiContext();
  const [updateIssueMutation, { isSuccess }] = useUpdateIssueMutation();
  const projectId = rest.row.project_id;
  const [projectMembers, setProjectMembers] = useState([]);
  const getProjectMembersQuery = useGetProjectMembersQuery(projectId);

  useEffect(() => {
    if (getProjectMembersQuery.isSuccess)
      setProjectMembers(getProjectMembersQuery.data.rows);
  }, [getProjectMembersQuery.data]);

  const handleChange = async (e) => {
    apiRef.current.startCellEditMode({ id, field });
    const isValid = await apiRef.current.setEditCellValue({
      id,
      field,
      value: e.target.value,
    });
    await updateIssueMutation({ id, body: { assignee_id: e.target.value } });
    dispatch(updateIssue({ assignee_id: e.target.value }));

    if (isValid) apiRef.current.stopCellEditMode({ id, field });
  };

  useEffect(() => {
    if (isSuccess) dispatch(setSnackbarOpen(true));
  }, [isSuccess]);

  return (
    <IssueAssigneeSelector
      value={!value ? 0 : value}
      projectMembers={projectMembers}
      handleChange={handleChange}
      isLoading={getProjectMembersQuery.isLoading}
    />
  );
};

export default SelectAssigneeEditCell;
