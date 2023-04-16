/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-wrap-multilines */
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MuiGrid from '@mui/material/Grid';

import IssuePrioritySelector from '../../components/IssuePrioritySelector';
import IssueStatusSelector from '../../components/IssueStatusSelector';
import Tab from '../../../../common/Tab';
import Tabs from '../../../../common/Tabs';
import TitleSection from '../../../../common/TitleSection';

import { setMessageBarOpen } from '../../../message-bar/message-bar.slice';
import {
  resetIssueSlice,
  setIssue,
  setIssuePriority,
  setIssueStatus,
  updateIssue,
} from '../../issue.slice';
import {
  useGetIssueQuery,
  useGetIssuesPriorityQuery,
  useGetIssuesStatusQuery,
  useUpdateIssueMutation,
} from '../../issue.api';

export default function Issue() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { data } = useGetIssueQuery(id);
  const issueStatus = useGetIssuesStatusQuery();
  const issuePriority = useGetIssuesPriorityQuery();
  const [updateIssueQuery, { isSuccess }] = useUpdateIssueMutation();

  const issue = useSelector((store) => store.issue.info);
  const tabName = location.pathname.split('/')[3];
  const mapTabToIndex = {
    overview: 0,
    tasks: 1,
    attachments: 2,
    comments: 3,
    settings: 4,
  };
  const [selectedTab, setSelectedTab] = useState(mapTabToIndex[tabName]);

  const updateTitleQuery = async () => {
    updateIssueQuery({ id, body: { name: issue.name } });
  };

  useEffect(() => {
    if (issueStatus.isSuccess) dispatch(setIssueStatus(issueStatus.data));
  }, [issueStatus]);

  useEffect(() => {
    if (issuePriority.isSuccess) dispatch(setIssuePriority(issuePriority.data));
  }, [issuePriority]);

  useEffect(() => {
    setSelectedTab(mapTabToIndex[tabName]);
  }, [id, tabName]);

  useEffect(() => {
    if (data) dispatch(setIssue(data));
  }, [data]);

  useEffect(() => {
    if (isSuccess) dispatch(setMessageBarOpen(true));
  }, [isSuccess]);

  const handleChange = (e, newValue) => {
    const mapIndexToTab = {
      0: `/issues/${issue.id}/overview`,
      1: `/issues/${issue.id}/tasks`,
      2: `/issues/${issue.id}/attachments `,
      3: `/issues/${issue.id}/comments`,
      4: `/issues/${issue.id}/settings`,
    };

    navigate(`${mapIndexToTab[newValue]}`);
    setSelectedTab(newValue);
  };

  // On component unmount: clear issue info
  useEffect(() => () => dispatch(resetIssueSlice()), []);

  return (
    <MuiGrid spacing={2} container>
      <MuiGrid xs={12} item>
        <TitleSection
          breadcrumbItems={[
            { text: 'Projects', onClick: () => navigate('/projects') },
            {
              text: issue.projectName,
              onClick: () => navigate(`/projects/${issue.projectId}/overview`),
            },
            {
              text: 'Issues',
              onClick: () => navigate(`/projects/${issue.projectId}/issues`),
            },
            {
              text: issue.id,
              onClick: () => navigate(`/issues/${issue.id}/overview`),
            },
          ]}
          isLoading={issue.isLoading}
          page={issue}
          prioritySelector={
            <IssuePrioritySelector
              handleChange={async (e) => {
                const { value } = e.target;
                dispatch(updateIssue({ priority: value }));
                await updateIssueQuery({ id, body: { priority: value } });

                if (isSuccess) dispatch(setMessageBarOpen(true));
              }}
              value={issue.priority}
              variant="dense"
            />
          }
          statusSelector={
            <IssueStatusSelector
              handleChange={async (e) => {
                const { value } = e.target;
                dispatch(updateIssue({ status: value }));
                await updateIssueQuery({ id, body: { status: value } });

                if (isSuccess) dispatch(setMessageBarOpen(true));
              }}
              value={issue.status}
              variant="dense"
            />
          }
          updateTitle={updateIssue}
          updateTitleQuery={updateTitleQuery}
          onClick={() => navigate('/issues')}
        />
      </MuiGrid>
      <MuiGrid xs={12} item>
        <Tabs value={selectedTab} onChange={handleChange}>
          <Tab isLoading={issue.isLoading} label="Overview" value={0} />
          <Tab isLoading={issue.isLoading} label="Tasks" value={1} />
          <Tab isLoading={issue.isLoading} label="Attachments" value={2} />
          <Tab isLoading={issue.isLoading} label="Comments" value={3} />
          <Tab isLoading={issue.isLoading} label="Settings" value={4} />
        </Tabs>
      </MuiGrid>
      <MuiGrid xs={12} item>
        <Outlet context={[selectedTab]} />
      </MuiGrid>
    </MuiGrid>
  );
}
