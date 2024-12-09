import React, { useEffect } from "react";
import Select from "../../../../common/components/Select";
import { useSnackbar } from "../../../../common/components/Snackbar/hooks";
import { SelectChangeEvent } from "@mui/material";
import { useUpdateIssueResolutionMutation } from "../../../../api/generated/issue.api";

interface Props {
  id: string;
  value: string;
}

export default function IssueResolutionSelector({ id, value }: Props) {
  const { showSuccess, showError } = useSnackbar();
  const [updateIssueResolution, { isSuccess, isError }] =
    useUpdateIssueResolutionMutation();

  const handleChange = async (e: SelectChangeEvent<string>) => {
    await updateIssueResolution({
      id,
      body: {
        resolution: e.target.value?.toLowerCase() == "yes" ? true : false,
      },
    });
  };

  useEffect(() => {
    if (isSuccess) {
      showSuccess("Resolution updated successfully");
    }

    if (isError) {
      showError("Failed to update issue resolution");
    }
  }, [isSuccess, isError]);

  return (
    <Select
      name="name"
      value={value ? "Yes" : "No"}
      onChange={handleChange}
      options={["Yes", "No"]}
      variant="small"
    />
  );
}
