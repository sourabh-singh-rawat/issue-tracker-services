import { useParams } from "react-router-dom";
import React, { useState } from "react";

// import IssueForm from "../../pages/IssueForm";

// import { setMembers } from "../../../project/project.slice";
import { useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../common/hooks";
import PrimaryButton from "../../../../common/components/buttons/PrimaryButton";
import IssueForm from "../../pages/IssueForm";
import Modal from "../../../../common/components/Modal";
import ModalHeader from "../../../../common/components/ModalHeader";

function AddIssueButton({ projectId }) {
  const theme = useTheme();
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const project = useAppSelector(({ project }) => project.settings);

  // const getProjectMembersQuery = useGetProjectMembersQuery(id);

  // useEffect(() => {
  //   if (getProjectMembersQuery.isSuccess) {
  //     dispatch(setMembers(getProjectMembersQuery.data));
  //   }
  // }, [getProjectMembersQuery.data]);

  return (
    <>
      <PrimaryButton label="Add Issue" onClick={handleOpen} />
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
