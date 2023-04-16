/* eslint-disable react/jsx-wrap-multilines */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import MuiGrid from '@mui/material/Grid';

import SectionHeader from '../../../../common/SectionHeader';
import PrimaryButton from '../../../../common/PrimaryButton';
import { reset } from '../../../project/project.slice';

function Projects() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => () => dispatch(reset()), []);

  return (
    <MuiGrid gap="40px" container>
      {pathname === '/projects' && (
        <MuiGrid xs={12} item>
          <SectionHeader
            actionButton={
              <PrimaryButton
                label="Create Project"
                onClick={() => navigate('/projects/new')}
              />
            }
            subtitle="This section contains all the projects that you have created. You can
          go to individual project to edit."
            title="Projects"
          />
        </MuiGrid>
      )}
      <MuiGrid xs={12} item>
        <Outlet />
      </MuiGrid>
    </MuiGrid>
  );
}

export default Projects;
