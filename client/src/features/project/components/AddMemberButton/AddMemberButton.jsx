import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MuiBox from '@mui/material/Box';
import MuiGrid from '@mui/material/Grid';
import MuiModal from '@mui/material/Modal';
import MuiTypography from '@mui/material/Typography';

import PrimaryButton from '../../../../common/PrimaryButton';
import Select from '../../../../common/Select';
import TextField from '../../../../common/TextField';

import { setMemberRoles } from '../../project.slice';
import { useGetRolesQuery, useSendInviteMutation } from '../../project.api';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 500,
  backgroundColor: 'background.paper',
  boxShadow: 24,
  borderRadius: '6px',
  p: 4,
};

function AddMemberButton() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [, setMembers] = useState([]);
  const [formFields, setFormFields] = useState({
    email: '',
    role_id: '',
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const memberRoles = useSelector((store) => store.project.options.roles.rows);

  const roles = useGetRolesQuery();
  const [sendInvite] = useSendInviteMutation();

  useEffect(() => {
    if (roles.data) dispatch(setMemberRoles(roles.data));
  }, [roles.data]);

  const onChange = (e) => {
    const { name, value } = e.target;

    setMembers([value]);
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendInvite({ id, payload: formFields });
  };

  return (
    <>
      <PrimaryButton label="Add Member" onClick={handleOpen} />
      <MuiModal
        open={open}
        sx={{
          '.MuiBackdrop-root': { backgroundColor: 'rgba(9, 30, 66, 0.54)' },
        }}
        onClose={handleClose}
      >
        <MuiBox component="form" sx={style} onSubmit={handleSubmit}>
          <MuiGrid spacing={2} container>
            <MuiGrid xs={12} item>
              <MuiTypography fontWeight="bold" variant="h5">
                Invite new members
              </MuiTypography>
              <MuiTypography variant="body2">
                Send invitation links to team members
              </MuiTypography>
            </MuiGrid>
            <MuiGrid xs={8} item>
              <MuiTypography
                fontWeight={500}
                sx={{ paddingBottom: 1 }}
                variant="body2"
              >
                Email
              </MuiTypography>
              <TextField
                name="email"
                placeholder="contact@email.com"
                size="small"
                sx={{ input: { fontSize: '14px' } }}
                fullWidth
                onChange={onChange}
              />
            </MuiGrid>
            <MuiGrid xs={4} item>
              <Select
                items={memberRoles}
                name="role_id"
                title="Role"
                value={formFields.role}
                displayEmpty
                onChange={onChange}
              />
            </MuiGrid>
            <MuiGrid xs={12} item>
              <PrimaryButton label="Send Invite" type="submit" />
            </MuiGrid>
          </MuiGrid>
        </MuiBox>
      </MuiModal>
    </>
  );
}

export default AddMemberButton;
