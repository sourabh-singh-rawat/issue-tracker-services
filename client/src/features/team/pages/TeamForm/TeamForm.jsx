import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import MuiBox from '@mui/material/Box';
import MuiGrid from '@mui/material/Grid';
import MuiButton from '@mui/material/Button';

import TextField from '../../../../common/TextField';
import SectionHeader from '../../../../common/SectionHeader';

import { useCreateTeamMutation } from '../../team.api';

import { setMessageBarOpen } from '../../../message-bar/message-bar.slice';

function TeamForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createTeamMutation, { isSuccess, data }] = useCreateTeamMutation();
  const [formFields, setFormFields] = useState({ name: '', description: '' });

  const handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormFields({ ...formFields, [fieldName]: fieldValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    createTeamMutation({ body: formFields });
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setMessageBarOpen(true));
      navigate(`/teams/${data.id}/overview`);
    }
  }, [isSuccess]);

  return (
    <MuiGrid gap="20px" container>
      <MuiGrid xs={12} item>
        <SectionHeader
          subtitle="Create teams to organize people involved with your project."
          title="Create Team"
        />
      </MuiGrid>
      <MuiGrid xs={12} item>
        <MuiBox component="form">
          <MuiGrid columnSpacing={4} rowSpacing="20px" container>
            <MuiGrid xs={12} item>
              <TextField
                helperText="The name for your team."
                name="name"
                title="Name"
                required
                onChange={handleChange}
              />
            </MuiGrid>
            <MuiGrid xs={12} item>
              <TextField
                helperText="A text description of your team. Max character count is 150."
                name="description"
                rows={4}
                title="Description"
                multiline
                onChange={handleChange}
              />
            </MuiGrid>
            <MuiGrid xs={12} item>
              <MuiGrid marginTop={2} container>
                <MuiGrid item>
                  <MuiButton
                    sx={{ textTransform: 'none', fontWeight: 600 }}
                    type="submit"
                    variant="contained"
                    fullWidth
                    onClick={handleSubmit}
                  >
                    Create Team
                  </MuiButton>
                </MuiGrid>
              </MuiGrid>
            </MuiGrid>
          </MuiGrid>
        </MuiBox>
      </MuiGrid>
    </MuiGrid>
  );
}

export default TeamForm;
