import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import MuiGrid from "@mui/material/Grid";
import MuiTypography from "@mui/material/Typography";
import AvatarGroup from "../AvatarGroup";
import { useMessageBar } from "../../../features/message-bar/hooks";
import AddIssueAssigneeModal from "../../../features/issue/components/AddIssueAssigneeModal";

interface Props {
  projectId: string;
  value: string;
  options?: string[];
}

export default function IssueAssignees({
  projectId,
  value,
  options = [],
}: Props) {
  console.log(projectId);
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { showSuccess, showError } = useMessageBar();
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
