import React, { useState } from "react";

import Modal from "../../../../shared/components/Modal";
import ModalHeader from "../../../../shared/components/ModalHeader";
import ModalBody from "../../../../shared/components/ModalBody";

import WorkspaceMemberForm from "../WorkspaceMemberForm";
import Button from "../../../../shared/components/buttons/Button";

export default function AddMemberButton() {
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button label="Add Workspace Member" onClick={handleClick} />
      <Modal open={open} handleClose={handleClose}>
        <ModalHeader
          title="Invite new members to workspace"
          subtitle="Send invitation links to your team members"
          handleClose={handleClose}
        />
        <ModalBody>
          <WorkspaceMemberForm />
        </ModalBody>
      </Modal>
    </>
  );
}
