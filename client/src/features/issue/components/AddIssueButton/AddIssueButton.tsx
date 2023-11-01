import React, { useState } from "react";
import PestControlIcon from "@mui/icons-material/PestControl";
import PrimaryButton from "../../../../common/components/buttons/PrimaryButton";
import IssueForm from "../../pages/IssueForm";
import Modal from "../../../../common/components/Modal";
import ModalHeader from "../../../../common/components/ModalHeader";

interface AddIssueButtonProps {
  projectId: string;
}

function AddIssueButton({ projectId }: AddIssueButtonProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <PrimaryButton
        label="Add Issue"
        onClick={handleOpen}
        startIcon={<PestControlIcon />}
      />
      <Modal open={open} handleClose={handleClose}>
        <ModalHeader
          title="New Issue"
          subtitle="Create issue and assign them to people"
          handleClose={handleClose}
        />
        <IssueForm projectId={projectId} />
      </Modal>
    </>
  );
}

export default AddIssueButton;
