import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import MuiBox from '@mui/material/Box';
import MuiModal from '@mui/material/Modal';

import IssueForm from '../../pages/IssueForm';
import PrimaryButton from '../../../../common/PrimaryButton';

import { setMembers } from '../../../project/project.slice';
import { useGetProjectMembersQuery } from '../../../project/project.api';

function AddIssueButton() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getProjectMembersQuery = useGetProjectMembersQuery(id);

  useEffect(() => {
    if (getProjectMembersQuery.isSuccess) {
      dispatch(setMembers(getProjectMembersQuery.data));
    }
  }, [getProjectMembersQuery.data]);

  return (
    <>
      <PrimaryButton label="Add Issue" onClick={handleOpen} />
      <MuiModal
        open={open}
        sx={{
          '.MuiBackdrop-root': { backgroundColor: 'rgba(9, 30, 66, 0.54)' },
        }}
        onClose={handleClose}
      >
        <MuiBox
          sx={{
            padding: 4,
            position: 'absolute',
            height: '85vh',
            overflowX: 'scroll',
            minWidth: '60vw',
            top: '50%',
            left: '50%',
            bgcolor: 'background.paper',
            transform: 'translate(-50%, -50%)',
            borderRadius: '6px',
            boxShadow: 24,
          }}
        >
          <IssueForm />
        </MuiBox>
      </MuiModal>
    </>
  );
}

export default AddIssueButton;
