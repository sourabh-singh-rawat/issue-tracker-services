import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOutletContext, useParams } from 'react-router-dom';

import MuiGrid from '@mui/material/Grid';
import MuiTypography from '@mui/material/Typography';

import { CircularProgress } from '@mui/material';
import TabPanel from '../../../../common/TabPanel';
import MembersCard from '../../components/MembersCard';
import PageDescription from '../../../../common/Description';
import IssueStats from '../../components/IssueStats';

import { setIssueStatusCount, updateProject } from '../../project.slice';
import { setMessageBarOpen } from '../../../message-bar/message-bar.slice';

import {
  useUpdateProjectMutation,
  useGetProjectIssuesStatusCountQuery,
} from '../../project.api';
import theme from '../../../../config/mui.config';

function ProjectOverview() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedTab] = useOutletContext();

  const projectSettings = useSelector((store) => store.project.settings);
  const issuesStatusCount = useSelector(
    (store) => store.project.issuesStatusCount,
  );

  const projectIssueStatusCount = useGetProjectIssuesStatusCountQuery(id);
  const [updateProjectMutation, { isSuccess }] = useUpdateProjectMutation();

  const updateDescriptionQuery = () => {
    updateProjectMutation({
      id,
      body: { description: projectSettings.description },
    });
  };

  useEffect(() => {
    if (projectIssueStatusCount.isSuccess) {
      dispatch(setIssueStatusCount(projectIssueStatusCount.data.rows));
    }
  }, [projectIssueStatusCount.data]);

  useEffect(() => {
    if (isSuccess) dispatch(setMessageBarOpen(true));
  }, [isSuccess]);

  return (
    <TabPanel index={0} selectedTab={selectedTab}>
      <MuiGrid spacing={2} container>
        <MuiGrid md={6} sm={12} xs={12} item>
          <PageDescription
            isLoading={projectSettings.isLoading}
            page={projectSettings}
            updateDescription={updateProject}
            updateDescriptionQuery={updateDescriptionQuery}
          />
        </MuiGrid>
        <MuiGrid md={6} sm={12} xs={12} item>
          <MuiTypography
            fontWeight={600}
            sx={{ color: theme.palette.grey[200] }}
            variant="body1"
          >
            Members:
          </MuiTypography>
          <MembersCard />
        </MuiGrid>
        <MuiGrid sm={12} item>
          {issuesStatusCount.isLoading ? (
            <CircularProgress />
          ) : (
            <>
              <MuiTypography
                fontWeight={600}
                sx={{ color: theme.palette.grey[200] }}
                variant="body1"
              >
                Issue Stats:
              </MuiTypography>
              {/* eslint-disable-next-line no-console */}
              {console.log(issuesStatusCount)}
              <IssueStats issuesStatusCount={issuesStatusCount.rows} />
            </>
          )}
        </MuiGrid>
      </MuiGrid>
    </TabPanel>
  );
}

export default ProjectOverview;
