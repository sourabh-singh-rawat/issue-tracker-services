/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';

import MuiGrid from '@mui/material/Grid';

import SectionHeader from '../../../../common/SectionHeader';
import PrimaryButton from '../../../../common/PrimaryButton';

function Teams() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <MuiGrid gap="40px" container>
      {pathname === '/teams' && (
        <MuiGrid xs={12} item>
          <SectionHeader
            actionButton={
              <PrimaryButton
                label="Create Team"
                onClick={() => navigate('/teams/new')}
              />
            }
            subtitle="Create teams to organize people involved with your project."
            title="Teams"
          />
        </MuiGrid>
      )}
      <MuiGrid xs={12} item>
        <Outlet />
      </MuiGrid>
    </MuiGrid>
  );
}

export default Teams;
