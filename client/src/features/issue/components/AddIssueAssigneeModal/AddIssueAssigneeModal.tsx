import React from "react";
import MuiGrid from "@mui/material/Grid";
import Modal from "../../../../common/components/Modal";
import ModalBody from "../../../../common/components/ModalBody";
import ModalHeader from "../../../../common/components/ModalHeader";
import { useGetProjectMembersQuery } from "../../../../api/generated/project.api";

interface Props {
  open: boolean;
  projectId: string;
  handleClose: () => void;
}

export default function AddIssueAssigneeModal({
  open,
  projectId,
  handleClose,
}: Props) {
  const { data } = useGetProjectMembersQuery({ id: projectId });

  return (
    <Modal open={open} handleClose={handleClose}>
      <ModalHeader
        title="Add Assignee"
        subtitle="project admins can assign this issue to project members"
        handleClose={handleClose}
      />
      <ModalBody>
        <MuiGrid container>
          {data?.rows.map(({ name, id }) => {
            return (
              <MuiGrid key={id} item xs={12}>
                {name}
              </MuiGrid>
            );
          })}
        </MuiGrid>
      </ModalBody>
    </Modal>
  );
}
