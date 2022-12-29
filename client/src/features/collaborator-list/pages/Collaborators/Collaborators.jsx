/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { useLocation, Outlet, useNavigate } from 'react-router-dom';

import MuiGrid from '@mui/material/Grid';

import SectionHeader from '../../../../common/headers/SectionHeader';
import PrimaryButton from '../../../../common/buttons/PrimaryButton';

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
