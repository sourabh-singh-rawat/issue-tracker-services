import { useDispatch } from "react-redux";
import { useGridApiContext } from "@mui/x-data-grid";

import SelectAssignee from "../../../../../common/IssueAssigneeSelector";

import { useUpdateIssueMutation } from "../../../../issue/issue.api";
import { updateIssue } from "../../../../issue/issue.slice";

const SelectAssigneeEditCell = ({ id, value, field, ...rest }) => {
  const dispatch = useDispatch();
  const apiRef = useGridApiContext();
  const [updateIssueMutation, { isSuccess }] = useUpdateIssueMutation();

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

  return (
    <SelectAssignee
      value={value === null ? 0 : value}
      projectId={rest.row.project_id}
      handleChange={handleChange}
    />
  );
};

export default SelectAssigneeEditCell;
