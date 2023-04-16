/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-wrap-multilines */
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import MuiGrid from '@mui/material/Grid';

import Tab from '../../common/Tab';
import Tabs from '../../common/Tabs';
import PageTitleSection from '../../common/TitleSection';
import ProjectStatusSelector from '../../features/project/components/ProjectStatusSelector';

import {
  setProject,
  setStatus,
  updateProject,
  reset,
} from '../../features/project/project.slice';
import { setMessageBarOpen } from '../../features/message-bar/message-bar.slice';

import {
  useGetStatusQuery,
  useGetProjectQuery,
  useUpdateProjectMutation,
} from '../../features/project/project.api';

function Project() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const project = useSelector((store) => store.project.settings);

  const status = useGetStatusQuery();
  const getProject = useGetProjectQuery(id);
  const [updateProjectMutation, { isSuccess }] = useUpdateProjectMutation();

  const tabName = location.pathname.split('/')[3];
  const mapPathToIndex = {
    overview: 0,
    issues: 1,
    members: 2,
    activity: 3,
    settings: 4,
  };

  const mapIndexToTab = {
    0: `/projects/${id}/overview`,
    1: `/projects/${id}/issues`,
    2: `/projects/${id}/members`,
    3: `/projects/${id}/activity`,
    4: `/projects/${id}/settings`,
  };

  const [selectedTab, setSelectedTab] = useState(mapPathToIndex[tabName]);

  const handleChange = (e, newValue) => {
    navigate(`${mapIndexToTab[newValue]}`);
    setSelectedTab(newValue);
  };

  const updateTitleQuery = () =>
    updateProjectMutation({ id, body: { name: project.name } });

  useEffect(() => {
    if (isSuccess) dispatch(setMessageBarOpen(true));
  }, [isSuccess]);

  useEffect(() => {
    if (status.data) dispatch(setStatus(status.data));
  }, [status]);

  useEffect(() => setSelectedTab(mapPathToIndex[tabName]), [tabName, id]);

  useEffect(() => {
    if (getProject.isSuccess) {
      dispatch(setProject({ ...getProject.data.data, isLoading: false }));
    }
  }, [getProject.isSuccess]);

  // when component dismounts: reset project state
  useEffect(() => () => dispatch(reset()), []);

  return (
    <MuiGrid spacing={2} container>
      <MuiGrid xs={12} item>
        <PageTitleSection
          breadcrumbItems={[
            {
              text: 'Projects',
              onClick: () => navigate('/projects'),
            },
            {
              text: project.name,
              onClick: () => navigate(`/projects/${project.id}/overview`),
            },
          ]}
          isLoading={project.isLoading}
          page={project}
          statusSelector={
            <ProjectStatusSelector
              handleChange={(e) => {
                const { value } = e.target;
                updateProjectMutation({ id, body: { status: value } });
                dispatch(updateProject({ status: value }));
              }}
              value={project.status}
              variant="dense"
            />
          }
          updateTitle={updateProject}
          updateTitleQuery={updateTitleQuery}
        />
      </MuiGrid>
      <MuiGrid xs={12} item>
        <Tabs value={selectedTab} onChange={handleChange}>
          <Tab isLoading={project.isLoading} label="Overview" value={0} />
          <Tab isLoading={project.isLoading} label="Issues" value={1} />
          <Tab isLoading={project.isLoading} label="Members" value={2} />
          <Tab isLoading={project.isLoading} label="Activity" value={3} />
          <Tab isLoading={project.isLoading} label="Settings" value={4} />
        </Tabs>
      </MuiGrid>
      <MuiGrid xs={12} item>
        <Outlet context={[selectedTab, id]} />
      </MuiGrid>
    </MuiGrid>
  );
}

export default Project;
