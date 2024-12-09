import { SelectChangeEvent } from "@mui/material";
import React, { useEffect, useState } from "react";
import Select from "../../../../common/components/Select";
import { useSnackbar } from "../../../../common/components/Snackbar/hooks";

interface IssueStatusSelectorProps {
  id: string;
  value: string;
  options?: string[];
  isDisabled?: boolean;
}

export default function IssueStatusSelector(
  { id, value, options = [], isDisabled }: IssueStatusSelectorProps,
) {
  const { showSuccess, showError } = useSnackbar();
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
