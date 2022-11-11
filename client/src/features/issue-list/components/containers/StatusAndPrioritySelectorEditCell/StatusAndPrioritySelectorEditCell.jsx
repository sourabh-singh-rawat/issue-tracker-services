import { useGridApiContext } from "@mui/x-data-grid";

import IssuePrioritySelector from "../../../../issue/components/containers/IssuePrioritySelector/IssuePrioritySelector";
import IssueStatusSelector from "../../../../issue/components/containers/IssueStatusSelector/IssueStatusSelector";

import { useUpdateIssueMutation } from "../../../../issue/issue.api";

const StatusAndPrioritySelectorEditCell = ({ id, field, value }) => {
  const apiRef = useGridApiContext();
  const [updateIssueMutation] = useUpdateIssueMutation();

  const handleChange = async (event) => {
    apiRef.current.startCellEditMode({ id, field });
    const isValid = await apiRef.current.setEditCellValue({
      id,
      field,
      value: event.target.value,
    });

    await updateIssueMutation({
      id,
      body: { [field]: event.target.value },
    });

    if (isValid) apiRef.current.stopCellEditMode({ id, field });
  };

  if (field === "status")
    return <IssueStatusSelector value={value} handleChange={handleChange} />;
  if (field === "priority")
    return <IssuePrioritySelector value={value} handleChange={handleChange} />;
};

export default StatusAndPrioritySelectorEditCell;
