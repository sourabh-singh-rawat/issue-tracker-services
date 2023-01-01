/* eslint-disable no-unused-vars */
import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import MuiGrid from '@mui/material/Grid';
import PrimaryButton from '../../../../common/PrimaryButton';
import SectionHeader from '../../../../common/SectionHeader';

function Collaborators() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <MuiGrid gap="40px" container>
      {pathname === '/collaborators' && (
        <MuiGrid xs={12} item>
          <SectionHeader
            actionButton={<PrimaryButton label="Invite" onClick={() => ''} />}
            subtitle="This section contains all the collaborators that work with you."
            title="Colaborators"
          />
        </MuiGrid>
      )}
      <MuiGrid xs={12} item>
        <Outlet />
      </MuiGrid>
    </MuiGrid>
  );
}

export default Collaborators;
