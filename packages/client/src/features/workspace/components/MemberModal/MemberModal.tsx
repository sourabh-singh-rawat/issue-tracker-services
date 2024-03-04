import React from "react";

import Modal from "../../../../common/components/Modal";
import ModalHeader from "../../../../common/components/ModalHeader";
import ModalBody from "../../../../common/components/ModalBody";

import WorkspaceMemberForm from "../WorkspaceMemberForm";

interface AddMemberButtonProps {
  open: boolean;
  handleClose: () => void;
}

export default function AddMemberButton({
  open,
  handleClose,
}: AddMemberButtonProps) {
  return (
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
  );
}
