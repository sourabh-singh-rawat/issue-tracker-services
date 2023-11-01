import React, { useEffect } from "react";
import { SelectChangeEvent } from "@mui/material";
import { useMessageBar } from "../../../message-bar/hooks";
import Select from "../../../../common/components/Select";
import { GridValidRowModel } from "@mui/x-data-grid";
import { useUpdateIssueMutation } from "../../../../api/generated/issue.api";

interface IssueStatusSelectorProps {
  id: string;
  value: string;
  row: GridValidRowModel;
}

export default function IssuePrioritySelector({
  id,
  value,
  row,
}: IssueStatusSelectorProps) {
  const { showSuccess, showError } = useMessageBar();
  const [updateIssue, { isSuccess, isError }] = useUpdateIssueMutation();

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
      options={row.priorityList}
      variant="small"
    />
  );
}
