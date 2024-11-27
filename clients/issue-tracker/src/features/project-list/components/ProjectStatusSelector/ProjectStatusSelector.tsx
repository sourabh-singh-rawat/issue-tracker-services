import React, { useEffect, useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import { useMessageBar } from "../../../message-bar/hooks";
import Select from "../../../../common/components/Select";

interface Props {
  id?: string;
  value: string;
  options?: string[];
}

export default function ProjectStatusSelector({
  id,
  value,
  options = [],
}: Props) {
  const { showSuccess, showError } = useMessageBar();
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
