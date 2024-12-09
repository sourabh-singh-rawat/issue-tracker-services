import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import AddIssueAssigneeModal from "../../../features/issue/components/AddIssueAssigneeModal";
import AvatarGroup from "../AvatarGroup";
import { useSnackbar } from "../Snackbar/hooks";

interface Props {
  projectId: string;
  value: string;
  options?: string[];
}

export default function IssueAssignees(
  { projectId, value, options = [] }: Props,
) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { showSuccess, showError } = useSnackbar();
  const handleChange = async () => {};
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // useEffect(() => {
  //   if (isError) showError("Failed to update project status");
  //   if (isSuccess) showSuccess("Status updated successfully");
  // }, [isSuccess, isError]);

  return (
    <>
      <AvatarGroup members={options} onClick={handleOpen} />
      <AddIssueAssigneeModal
        projectId={projectId}
        open={open}
        handleClose={handleClose}
      />
    </>
  );
}
