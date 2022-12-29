import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';

import MuiBox from '@mui/material/Box';
import MuiGrid from '@mui/material/Grid';
import MuiButton from '@mui/material/Button';
import MuiTypography from '@mui/material/Typography';

import TabPanel from '../../../../common/tabs/TabPanel';
import TextField from '../../../../common/textfields/TextField';

import { updateList } from '../../slice/team.slice';
import { setMessageBarOpen } from '../../../message-bar/slice/message-bar.slice';

function TeamSettings() {
  const [selectedTab] = useOutletContext();
  const team = useSelector((store) => store.team);
  const dispatch = useDispatch();

  const handleChange = ({ target: { name, value } }) => {
    dispatch(updateList({ [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description } = team;

    const response = await fetch(`http://localhost:4000/api/teams/${team.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description }),
    });

    if (response.status === 200) dispatch(setMessageBarOpen(true));
  };

  return (
    <TabPanel index={4} selectedTab={selectedTab}>
      <MuiBox component="form" onSubmit={handleSubmit}>
        <MuiGrid sx={{ marginTop: 3 }} container>
          <MuiGrid md={4} xs={12} item>
            <MuiTypography sx={{ fontWeight: 600 }} variant="body2">
              basic Information
            </MuiTypography>
          </MuiGrid>
          <MuiGrid md={8} xs={12} item>
            <MuiGrid container>
              <MuiGrid xs={12} item>
                <TextField
                  helperText="A name for your team"
                  name="name"
                  title="Name"
                  value={team.name}
                  onChange={handleChange}
                />
              </MuiGrid>
              <MuiGrid xs={12} item>
                <TextField
                  helperText="This is the UID of the team owner"
                  name="id"
                  title="team ID"
                  value={team.id}
                  disabled
                />
              </MuiGrid>
              <MuiGrid xs={12} item>
                <TextField
                  helperText="A text description of the project. Max character count is 150"
                  name="description"
                  rows={4}
                  title="Description"
                  value={team.description}
                  multiline
                  onChange={handleChange}
                />
              </MuiGrid>
            </MuiGrid>
          </MuiGrid>
          <MuiGrid sx={{ marginTop: 3, marginBottom: 8 }} container>
            <MuiGrid md={4} item />
            <MuiGrid md={8} item>
              <MuiButton
                sx={{ textTransform: 'none', fontWeight: 600 }}
                type="submit"
                variant="contained"
              >
                Save Changes
              </MuiButton>
            </MuiGrid>
          </MuiGrid>
        </MuiGrid>
      </MuiBox>
    </TabPanel>
  );
}

export default TeamSettings;
