/* eslint-disable object-curly-newline */
import { format, formatISO, parseISO } from 'date-fns';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOutletContext, useParams } from 'react-router-dom';

import MuiDivider from '@mui/material/Divider';
import MuiGrid from '@mui/material/Grid';
import MuiSkeleton from '@mui/material/Skeleton';
import MuiTypography from '@mui/material/Typography';

import DatePicker from '../../../../common/DatePicker';
import IssueAssigneeSelector from '../../../../common/IssueAssigneeSelector';
import IssuePrioritySelector from '../../components/IssuePrioritySelector';
import IssueStatusSelector from '../../components/IssueStatusSelector';
import PrimaryButton from '../../../../common/PrimaryButton';
import TabPanel from '../../../../common/TabPanel';
import TextField from '../../../../common/TextField';

import { setMembers } from '../../../project/project.slice';
import { setMessageBarOpen } from '../../../message-bar/message-bar.slice';
import { updateIssue } from '../../issue.slice';

import { useGetProjectMembersQuery } from '../../../project/project.api';
import { useUpdateIssueMutation } from '../../issue.api';

function IssueSettings() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedTab] = useOutletContext();
  const [updateIssueMutation, { isSuccess, data }] = useUpdateIssueMutation();

  const issue = useSelector((store) => store.issue.info);
  const getProjectMembersQuery = useGetProjectMembersQuery(issue?.projectId);
  const project = useSelector((store) => store.project);

  useEffect(() => {
    if (getProjectMembersQuery.isSuccess) {
      dispatch(setMembers(getProjectMembersQuery.data));
    }
  }, [getProjectMembersQuery.data]);

  useEffect(() => {
    if (isSuccess) dispatch(setMessageBarOpen(true));
  }, [data]);

  const handleChange = ({ target: { name, value } }) => {
    dispatch(updateIssue({ [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description, status, priority, dueDate, reporter } = issue;
    updateIssueMutation({
      id,
      body: { name, description, status, priority, dueDate, reporter },
    });
  };

  return (
    <TabPanel index={4} selectedTab={selectedTab}>
      <MuiGrid
        component="form"
        rowSpacing={2}
        container
        onSubmit={handleSubmit}
      >
        <MuiGrid xs={12} item>
          <MuiGrid rowSpacing={2} container>
            <MuiGrid md={4} xs={12} item>
              <MuiTypography sx={{ fontWeight: 600 }} variant="body2">
                Basic Information:
              </MuiTypography>
            </MuiGrid>
            <MuiGrid md={8} xs={12} item>
              <MuiGrid rowSpacing={3} container>
                <MuiGrid xs={12} item>
                  <TextField
                    isLoading={issue.isLoading}
                    name="name"
                    title="Name"
                    value={issue.name}
                    onChange={handleChange}
                  />
                </MuiGrid>
                <MuiGrid xs={12} item>
                  <TextField
                    isLoading={issue.isLoading}
                    name="id"
                    title="Issue ID"
                    value={issue.id}
                    disabled
                  />
                </MuiGrid>
                <MuiGrid xs={12} item>
                  <TextField
                    isLoading={issue.isLoading}
                    name="id"
                    title="Project ID"
                    value={issue.projectId}
                    disabled
                  />
                </MuiGrid>
                <MuiGrid xs={12} item>
                  <TextField
                    helperText="A text description of the project. Max character count is 150"
                    isLoading={issue.isLoading}
                    minRows={6}
                    name="description"
                    title="Description"
                    value={issue.description}
                    multiline
                    onChange={handleChange}
                  />
                </MuiGrid>
              </MuiGrid>
            </MuiGrid>
          </MuiGrid>
          <MuiDivider sx={{ marginTop: 2 }} />
        </MuiGrid>
        <MuiGrid xs={12} item>
          <MuiGrid rowSpacing={2} container>
            <MuiGrid md={4} xs={12} item>
              <MuiTypography sx={{ fontWeight: 600 }} variant="body2">
                Issue Properties:
              </MuiTypography>
            </MuiGrid>
            <MuiGrid md={8} xs={12} item>
              <MuiGrid spacing={3} container>
                <MuiGrid xs={12} item>
                  <TextField
                    helperText="The day this project was created, this cannot be changed."
                    isLoading={issue.isLoading}
                    name="createdAt"
                    title="Created At"
                    value={
                      issue.createdAt
                        ? format(parseISO(issue.createdAt), 'PPPPpppp')
                        : 'loading'
                    }
                    disabled
                  />
                </MuiGrid>
                <MuiGrid xs={12} item>
                  <IssueAssigneeSelector
                    handleChange={async (e) => {
                      const userId = e.target.value;
                      await updateIssueMutation({
                        id: issue.id,
                        body: { assigneeId: userId },
                      });
                      dispatch(updateIssue({ assigneeId: userId }));
                    }}
                    isLoading={project.members.isLoading}
                    projectMembers={project.members.rows}
                    title="Assignee"
                    value={issue.assigneeId}
                  />
                </MuiGrid>
                <MuiGrid xs={6} item>
                  <IssueStatusSelector
                    handleChange={handleChange}
                    helperText="The current status of issue."
                    isLoading={issue.isLoading}
                    name="status"
                    title="Status"
                    value={issue.status}
                  />
                </MuiGrid>
                <MuiGrid xs={6} item>
                  <IssuePrioritySelector
                    handleChange={handleChange}
                    helperText="The current priority of issue."
                    isLoading={issue.isLoading}
                    name="priority"
                    title="Priority"
                    value={issue.priority}
                  />
                </MuiGrid>
                <MuiGrid md={6} xs={12} item>
                  <DatePicker
                    handleChange={handleChange}
                    isLoading={issue.isLoading}
                    name="dueDate"
                    title="Due Date"
                    value={issue.dueDate ? parseISO(issue.dueDate) : null}
                    onChange={(date) => {
                      dispatch(updateIssue({ dueDate: formatISO(date) }));
                    }}
                  />
                </MuiGrid>
              </MuiGrid>
            </MuiGrid>
          </MuiGrid>
        </MuiGrid>
        <MuiGrid sx={{ marginBottom: 8 }} xs={12} item>
          <MuiGrid container>
            <MuiGrid md={4} item />
            <MuiGrid md={8} xs={12} item>
              {issue.isLoading ? (
                <MuiSkeleton width="20%" />
              ) : (
                <PrimaryButton label="Save Changes" type="submit" />
              )}
            </MuiGrid>
          </MuiGrid>
        </MuiGrid>
      </MuiGrid>
    </TabPanel>
  );
}

export default IssueSettings;
