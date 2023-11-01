import React, { useEffect } from "react";
import { useUpdateProjectMutation } from "../../../../api/generated/project.api";
import { SelectChangeEvent } from "@mui/material";
import { useMessageBar } from "../../../message-bar/hooks";
import Select from "../../../../common/components/Select";
import { GridValidRowModel } from "@mui/x-data-grid";

interface ProjectStatusSelectorProps {
  id: string;
  value: string;
  row: GridValidRowModel;
}

export default function ProjectStatusSelector({
  id,
  value,
  row,
}: ProjectStatusSelectorProps) {
  const { showSuccess, showError } = useMessageBar();
  const [updateProject, { isSuccess, isError }] = useUpdateProjectMutation();

  const handleChange = async (e: SelectChangeEvent<string>) => {
    await updateProject({
      id,
      body: { status: e.target.value },
    });
  };

  useEffect(() => {
    if (isSuccess) {
      showSuccess("Status updated successfully");
    }

    if (isError) {
      showError("Failed to update project status");
    }
  }, [isSuccess, isError]);

  return (
    <Select
      name="status"
      value={value}
      onChange={handleChange}
      options={row.statuses}
      variant="small"
    />
  );
}
