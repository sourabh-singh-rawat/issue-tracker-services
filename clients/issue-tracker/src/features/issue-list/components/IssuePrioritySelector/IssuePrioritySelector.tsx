import { SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import Select from "../../../../common/components/Select";
import { useSnackbar } from "../../../../common/components/Snackbar/hooks";

interface IssueStatusSelectorProps {
  id: string;
  value: string;
  options?: string[];
  isDisabled?: boolean;
}

export default function IssuePrioritySelector({
  id,
  value,
  options = [],
  isDisabled,
}: IssueStatusSelectorProps) {
  const { success: showSuccess, error: showError } = useSnackbar();
  const [updateIssue, { isSuccess, isError }] = useState();

  const handleChange = async (e: SelectChangeEvent<string>) => {
    await updateIssue({
      id,
      body: { priority: e.target.value },
    });
  };

  useEffect(() => {
    if (isSuccess) {
      showSuccess("Priority updated successfully");
    }

    if (isError) {
      showError("Failed to update issue priority");
    }
  }, [isSuccess, isError]);

  return (
    <Select
      name="status"
      value={value}
      onChange={handleChange}
      options={options}
      variant="small"
      isDisabled={isDisabled}
    />
  );
}
