import React, { useEffect, useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import { useMessageBar } from "../../../message-bar/hooks";
import Select from "../../../../common/components/Select";

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
  const { showSuccess, showError } = useMessageBar();
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
