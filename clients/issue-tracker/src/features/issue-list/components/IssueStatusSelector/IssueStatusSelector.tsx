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

export default function IssueStatusSelector({
  id,
  value,
  options = [],
  isDisabled,
}: IssueStatusSelectorProps) {
  const { showSuccess, showError } = useMessageBar();
  const [updateIssueStatus, { isSuccess, isError }] = useState();

  const handleChange = async (e: SelectChangeEvent<string>) => {
    await updateIssueStatus({
      id,
      body: { status: e.target.value },
    });
  };

  useEffect(() => {
    if (isSuccess) {
      showSuccess("Status updated successfully");
    }

    if (isError) {
      showError("Failed to update issue status");
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
