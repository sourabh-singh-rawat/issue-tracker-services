import { SelectChangeEvent } from "@mui/material";
import React, { useEffect, useState } from "react";
import Select from "../../../../common/components/Select";
import { useSnackbar } from "../../../../common/components/Snackbar/hooks";

interface Props {
  id?: string;
  value: string;
  options?: string[];
}

export default function ProjectStatusSelector(
  { id, value, options = [] }: Props,
) {
  const { showSuccess, showError } = useSnackbar();
  const [updateProject, { isSuccess, isError }] = useState([]);

  const handleChange = async (e: SelectChangeEvent<string>) => {
    if (!id) return;

    await updateProject({ id, body: { status: e.target.value } });
  };

  useEffect(() => {
    if (isError) showError("Failed to update project status");
    if (isSuccess) showSuccess("Status updated successfully");
  }, [isSuccess, isError]);

  return (
    <Select
      name="status"
      value={value}
      onChange={handleChange}
      options={options}
      variant="small"
    />
  );
}
