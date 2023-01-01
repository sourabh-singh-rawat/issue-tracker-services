/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import MuiAutocomplete from '@mui/material/Autocomplete';
import MuiBox from '@mui/material/Box';
import MuiGrid from '@mui/material/Grid';

import DatePicker from '../../../../common/DatePicker';
import SectionHeader from '../../../../common/SectionHeader';
import TextField from '../../../../common/TextField';

import IssueAssigneeSelector from '../../../../common/IssueAssigneeSelector';
import IssuePrioritySelector from '../../components/IssuePrioritySelector';
import IssueStatusSelector from '../../components/IssueStatusSelector';
import PrimaryButton from '../../../../common/PrimaryButton';

import Label from '../../../../common/Label';

import { useGetProjectMembersQuery } from '../../../project/project.api';
import { useGetProjectsQuery } from '../../../project-list/project-list.api';
import {
  useCreateIssueMutation,
  useGetIssuesPriorityQuery,
  useGetIssuesStatusQuery,
} from '../../issue.api';

import { setMembers } from '../../../project/project.slice';
import {
  setIssuePriority,
  setIssueStatus,
  updateIssue,
} from '../../issue.slice';

function IssueForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.auth.user);
  const status = useSelector((store) => store.issue.options.status);
  const priority = useSelector((store) => store.issue.options.priority);
  const project = useSelector((store) => store.project.settings);
  const members = useSelector((store) => store.project.members);

  const [projects, setProjects] = useState([]);
  const [formFields, setFormFields] = useState({
    name: '',
    description: '',
    status: '',
    priority: '',
    dueDate: null,
    assigneeId: null,
    projectId: project.id,
  });

  const [createIssue] = useCreateIssueMutation();
  const issueStatus = useGetIssuesStatusQuery();
  const issuePriority = useGetIssuesPriorityQuery();
  const getProjectsQuery = useGetProjectsQuery({
    page: 0,
    pageSize: 10,
    sortBy: 'created_at:desc',
  });
  const getProjectMembersQuery = useGetProjectMembersQuery(
    formFields.project_id,
  );

  useEffect(() => {
    if (issueStatus.isSuccess) {
      dispatch(setIssueStatus(issueStatus.data));
    }
  }, [issueStatus]);

  useEffect(() => {
    if (issuePriority.isSuccess) {
      dispatch(setIssuePriority(issuePriority.data));
    }
  }, [issuePriority]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await createIssue({ body: formFields });
    navigate(`/issues/${data.id}/overview`);
  };

  // once the project(s) are recieved from the server,
  // store the project(s) in the redux store.
  useEffect(() => {
    if (getProjectsQuery.isSuccess) {
      setProjects(getProjectsQuery.data.rows);
    }
  }, [getProjectsQuery.data]);

  // once the project members are recieved from the server,
  // store the project members in the redux store.
  useEffect(() => {
    if (getProjectMembersQuery.isSuccess) {
      dispatch(setMembers(getProjectMembersQuery.data));
    }
  }, [getProjectMembersQuery.data]);

  // once the values of the formFields are updated,
  // store the default status and priority in the formFields.
  // this is done to ensure that the status and priority are
  // not null when the Form is initially rendered.
  useEffect(() => {
    setFormFields({
      ...formFields,
      status: status.rows[0].id,
      priority: priority.rows[0].id,
    });
  }, [priority.rows[0].id, status.rows[0].id]);

  return (
    <MuiGrid gap="20px" container>
      <MuiGrid xs={12} item>
        <SectionHeader
          subtitle="Issues are problem you need to solve"
          title="New Issue"
        />
      </MuiGrid>
      <MuiGrid xs={12} item>
        <MuiBox component="form" onSubmit={handleSubmit}>
          <MuiGrid columnSpacing={4} rowSpacing={3} container>
            <MuiGrid sm={12} xs={12} item>
              <TextField
                name="name"
                title="Name"
                fullWidth
                required
                onChange={handleChange}
              />
            </MuiGrid>
            <MuiGrid sm={12} xs={12} item>
              <TextField
                helperText="A text description of the issue."
                minRows={6}
                name="description"
                title="Description"
                fullWidth
                multiline
                onChange={handleChange}
              />
            </MuiGrid>
            <MuiGrid sm={12} xs={12} item>
              {id ? (
                <TextField
                  name="projectId"
                  title="Project"
                  value={project.isLoading ? 'loading' : project.name}
                  disabled
                />
              ) : (
                <>
                  <Label title="Project" />
                  <MuiAutocomplete
                    getOptionLabel={(option) => `${option.name}`}
                    options={projects}
                    renderInput={(params) => <TextField {...params} />}
                    size="small"
                    disablePortal
                    fullWidth
                    required
                    onChange={(e, selectedProject) => {
                      setFormFields({
                        ...formFields,
                        project_id: selectedProject.id,
                      });
                    }}
                  />
                </>
              )}
            </MuiGrid>
            <MuiGrid sm={12} xs={12} item>
              <IssueAssigneeSelector
                handleChange={(e) => {
                  const { value } = e.target;

                  setFormFields({
                    ...formFields,
                    assigneeId: value,
                  });
                  dispatch(updateIssue({ assigneeId: value }));
                }}
                isLoading={members.isLoading}
                projectMembers={members.rows}
                title="Assignee"
                value={formFields.assigneeId}
              />
            </MuiGrid>
            <MuiGrid md={6} sm={12} xs={12} item>
              <TextField
                helperText="This is the person who created this issue."
                name="reporter"
                title="Reporter"
                value={user ? user.email : 'none'}
                disabled
                fullWidth
                onChange={handleChange}
              />
            </MuiGrid>
            <MuiGrid sm={6} xs={12} item>
              <IssuePrioritySelector
                handleChange={handleChange}
                title="Priority"
                value={formFields.priority}
              />
            </MuiGrid>
            <MuiGrid sm={6} xs={12} item>
              <DatePicker
                getOptionLabel={(option) => `${option.name}`}
                minDate={new Date()}
                name="dueDate"
                title="Due Date"
                value={formFields.dueDate}
                onChange={(date) =>
                  setFormFields({ ...formFields, dueDate: date })
                }
              />
            </MuiGrid>
            <MuiGrid sm={6} xs={12} item>
              <IssueStatusSelector
                handleChange={handleChange}
                title="Status"
                value={formFields.status}
              />
            </MuiGrid>
            <MuiGrid xs={12} item>
              <PrimaryButton
                label="Create Issue"
                type="submit"
                onClick={handleSubmit}
              />
            </MuiGrid>
          </MuiGrid>
        </MuiBox>
      </MuiGrid>
    </MuiGrid>
  );
}

export default IssueForm;
