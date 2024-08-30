import React, { useState } from "react";

import Modal from "../../../../common/components/Modal";
import ModalHeader from "../../../../common/components/ModalHeader";
import ModalBody from "../../../../common/components/ModalBody";

import WorkspaceMemberForm from "../WorkspaceMemberForm";
import Button from "../../../../common/components/buttons/Button";

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
