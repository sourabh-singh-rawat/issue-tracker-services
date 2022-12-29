/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

import MuiGrid from '@mui/material/Grid';

import SectionHeader from '../../../../common/headers/SectionHeader';
import PrimaryButton from '../../../../common/buttons/PrimaryButton';

function Issues() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <MuiGrid gap="40px" container>
      {pathname === '/issues' && (
        <MuiGrid xs={12} item>
          <SectionHeader
            actionButton={
              <PrimaryButton
                label="Create Issue"
                onClick={() => navigate('/issues/new')}
              />
            }
            subtitle="All the issues assgined to you or created by you."
            title="Issues"
          />
        </MuiGrid>
      )}
      <MuiGrid xs={12} item>
        <Outlet />
      </MuiGrid>
    </MuiGrid>
  );
}

export default Issues;
