/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import MuiGrid from '@mui/material/Grid';

import Tab from '../../../../common/tabs/Tab';
import Tabs from '../../../../common/tabs/Tabs';
import PageTitleSection from '../../../../common/headers/TitleSection';
import ProjectStatusSelector from '../../components/containers/ProjectStatusSelector';

import {
  setProject,
  setProjectQuick,
  setStatus,
  updateProject,
  resetProjectSlice,
  updateProjectQuick,
} from '../../slice/project.slice';
import { setMessageBarOpen } from '../../../message-bar/slice/message-bar.slice';

import {
  useGetStatusQuery,
  useGetProjectQuery,
  useUpdateProjectMutation,
} from '../../api/project.api';

function Project() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const project = useSelector((store) => store.project.quick);
  const projectDetailed = useSelector((store) => store.project.settings);

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

  const updateTitleQuery = () => {
    updateProjectMutation({ id, body: { name: project.name } });
  };

  useEffect(() => {
    if (isSuccess) dispatch(setMessageBarOpen(true));
  }, [isSuccess]);

  useEffect(() => {
    if (status.data) dispatch(setStatus(status.data));
  }, [status]);

  useEffect(() => {
    setSelectedTab(mapPathToIndex[tabName]);
  }, [tabName, id]);

  useEffect(() => {
    if (getProject.isSuccess) {
      dispatch(setProjectQuick(getProject.data));
      dispatch(setProject({ ...getProject.data, isLoading: false }));
    }
  }, [getProject.data]);

  // when component dismounts: reset project state
  useEffect(
    () => () => {
      dispatch(resetProjectSlice());
    },
    [],
  );

  return (
    <MuiGrid container spacing={2}>
      <MuiGrid item xs={12}>
        <PageTitleSection
          page={project}
          isLoading={project.isLoading}
          updateTitle={updateProjectQuick}
          updateTitleQuery={updateTitleQuery}
          breadcrumbItems={[
            {
              text: 'Projects',
              onClick: () => navigate('/projects'),
            },
            {
              text: project.name,
              onClick: () =>
                navigate(`/projects/${projectDetailed.id}/overview`),
            },
          ]}
          statusSelector={
            <ProjectStatusSelector
              variant="dense"
              value={project.status}
              handleChange={(e) => {
                const { value } = e.target;
                updateProjectMutation({ id, body: { status: value } });
                dispatch(updateProject({ status: value }));
              }}
            />
          }
        />
      </MuiGrid>
      <MuiGrid item xs={12}>
        <Tabs value={selectedTab} onChange={handleChange}>
          <Tab label="Overview" value={0} />
          <Tab label="Issues" value={1} />
          <Tab label="Members" value={2} />
          <Tab label="Activity" value={3} />
          <Tab label="Settings" value={4} />
        </Tabs>
      </MuiGrid>
      <MuiGrid item xs={12}>
        <Outlet context={[selectedTab, id]} />
      </MuiGrid>
    </MuiGrid>
  );
}

export default Project;
