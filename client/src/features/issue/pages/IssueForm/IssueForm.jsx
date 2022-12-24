/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import MuiBox from '@mui/material/Box';
import MuiGrid from '@mui/material/Grid';
import MuiAutocomplete from '@mui/material/Autocomplete';

import DatePicker from '../../../../common/dates/DatePicker';
import TextField from '../../../../common/textfields/TextField';
import SectionHeader from '../../../../common/headers/SectionHeader';

import PrimaryButton from '../../../../common/buttons/PrimaryButton';
import IssueStatusSelector from '../../components/containers/IssueStatusSelector';
import IssueAssigneeSelector from '../../../../common/selects/IssueAssigneeSelector';
import IssuePrioritySelector from '../../components/containers/IssuePrioritySelector';

import {
  useCreateIssueMutation,
  useGetIssuesPriorityQuery,
  useGetIssuesStatusQuery,
} from '../../api/issue.api';
import { useGetProjectMembersQuery } from '../../../project/api/project.api';
import { useGetProjectsQuery } from '../../../project-list/api/project-list.api';

import {
  setIssuePriority,
  setIssueStatus,
  updateIssue,
} from '../../slice/issue.slice';
import { setMembers } from '../../../project/slice/project.slice';
import Label from '../../../../common/utilities/Label';

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
    <MuiGrid container gap="20px">
      <MuiGrid item xs={12}>
        <SectionHeader
          title="New Issue"
          subtitle="Issues are problem you need to solve"
        />
      </MuiGrid>
      <MuiGrid item xs={12}>
        <MuiBox component="form" onSubmit={handleSubmit}>
          <MuiGrid container rowSpacing={3} columnSpacing={4}>
            <MuiGrid item xs={12} sm={12}>
              <TextField
                name="name"
                title="Name"
                onChange={handleChange}
                fullWidth
                required
              />
            </MuiGrid>
            <MuiGrid item xs={12} sm={12}>
              <TextField
                name="description"
                title="Description"
                onChange={handleChange}
                helperText="A text description of the issue."
                multiline
                minRows={6}
                fullWidth
              />
            </MuiGrid>
            <MuiGrid item xs={12} sm={12}>
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
                    disablePortal
                    size="small"
                    options={projects}
                    onChange={(e, selectedProject) => {
                      setFormFields({
                        ...formFields,
                        project_id: selectedProject.id,
                      });
                    }}
                    getOptionLabel={(option) => `${option.name}`}
                    renderInput={(params) => <TextField {...params} />}
                    fullWidth
                    required
                  />
                </>
              )}
            </MuiGrid>
            <MuiGrid item xs={12} sm={12}>
              <IssueAssigneeSelector
                title="Assignee"
                value={formFields.assigneeId}
                isLoading={members.isLoading}
                projectMembers={members.rows}
                handleChange={(e) => {
                  const { value } = e.target;

                  setFormFields({
                    ...formFields,
                    assigneeId: value,
                  });
                  dispatch(updateIssue({ assigneeId: value }));
                }}
              />
            </MuiGrid>
            <MuiGrid item xs={12} sm={12} md={6}>
              <TextField
                name="reporter"
                title="Reporter"
                value={user ? user.email : 'none'}
                onChange={handleChange}
                helperText="This is the person who created this issue."
                fullWidth
                disabled
              />
            </MuiGrid>
            <MuiGrid item xs={12} sm={6}>
              <IssuePrioritySelector
                title="Priority"
                handleChange={handleChange}
                value={formFields.priority}
              />
            </MuiGrid>
            <MuiGrid item xs={12} sm={6}>
              <DatePicker
                name="dueDate"
                title="Due Date"
                minDate={new Date()}
                value={formFields.dueDate}
                getOptionLabel={(option) => `${option.name}`}
                onChange={(date) =>
                  setFormFields({ ...formFields, dueDate: date })
                }
              />
            </MuiGrid>
            <MuiGrid item xs={12} sm={6}>
              <IssueStatusSelector
                title="Status"
                handleChange={handleChange}
                value={formFields.status}
              />
            </MuiGrid>
            <MuiGrid item xs={12}>
              <PrimaryButton
                type="submit"
                label="Create Issue"
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
