import React, { useState } from "react";
import PestControlIcon from "@mui/icons-material/PestControl";
import PrimaryButton from "../../../../common/components/buttons/PrimaryButton";
import IssueModal from "../IssueModal";

interface AddIssueButtonProps {
  projectId: string;
}

export default function AddIssueButton({ projectId }: AddIssueButtonProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <PrimaryButton
        label="Add"
        onClick={handleOpen}
        startIcon={<PestControlIcon />}
      />
      <IssueModal open={open} handleClose={handleClose} projectId={projectId} />
    </>
  );
}
