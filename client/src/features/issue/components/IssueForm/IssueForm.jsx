import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import MuiBox from "@mui/material/Box";
import MuiGrid from "@mui/material/Grid";
import MuiButton from "@mui/material/Button";
import MuiTypography from "@mui/material/Typography";
import MuiAutocomplete from "@mui/material/Autocomplete";

import TextField from "../../../../common/TextField";
import DatePicker from "../../../../common/DatePicker";
import SectionHeader from "../../../../common/SectionHeader";

import IssueStatusSelector from "../IssueStatusSelector/IssueStatusSelector";
import IssuePrioritySelector from "../IssuePrioritySelector/IssuePrioritySelector";

import { useCreateIssueMutation } from "../../issue.api";
import { useGetProjectsQuery } from "../../../projectList/projectList.api";
import { useGetCollaboratorsQuery } from "../../../collaboratorList/collaboratorList.api";

const IssueForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = useSelector((store) => store.auth.user);
  const project = useSelector((store) => store.project.info);

  const allProjects = useGetProjectsQuery({
    page: 0,
    pageSize: 10,
    sortBy: "creation_date:desc",
  });
  const collaborators = useGetCollaboratorsQuery(user.uid);
  const [createIssue, { isSuccess }] = useCreateIssueMutation();

  const [projects, setProjects] = useState([]);
  const [projectMembers, setProjectMembers] = useState([]);
  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    status: "0_OPEN",
    priority: "0_LOWEST",
    // assigned_to: null,
    due_date: null,
    project_id: "",
    team_id: "",
  });

  useEffect(() => {
    if (allProjects.isSuccess) setProjects(allProjects.data.rows);
  }, [allProjects.data]);

  useEffect(() => {
    if (collaborators.isSuccess) setProjectMembers(collaborators.data.rows);
  }, [collaborators.data]);

  useEffect(() => {
    setFormFields({
      ...formFields,
      project_id: project.id,
    });
  }, [project]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormFields({ ...formFields, [name]: value, uid: user.uid });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formFields);

    const { data } = await createIssue({ body: formFields });
    navigate(`/issues/${data.id}/overview`);
  };

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
          <MuiGrid container rowSpacing="20px" columnSpacing={4}>
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
                fullWidth
              />
            </MuiGrid>
            <MuiGrid item xs={12} sm={12}>
              {id ? (
                <TextField
                  name="project_id"
                  title="Project"
                  value={project ? project.name : "loading"}
                  disabled
                />
              ) : (
                <Fragment>
                  <MuiTypography
                    variant="body2"
                    sx={{
                      color: "primary.text",
                      paddingBottom: 1,
                      fontWeight: 600,
                    }}
                  >
                    Project
                  </MuiTypography>
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
                    getOptionLabel={(option) => {
                      return `${option.name}`;
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    fullWidth
                    required
                  />
                </Fragment>
              )}
            </MuiGrid>
            <MuiGrid item xs={12} sm={6}>
              <TextField
                name="reporter"
                title="Reporter"
                value={user ? user.email : "none"}
                onChange={handleChange}
                helperText="This is the person who created this issue."
                fullWidth
                disabled
              />
            </MuiGrid>
            {/* <MuiGrid item xs={12} sm={6}>
              <MuiTypography
                variant="body2"
                sx={{
                  color: "primary.text",
                  fontWeight: 600,
                  paddingBottom: 1,
                }}
              >
                Assigned To
              </MuiTypography>
              <MuiAutocomplete
                disablePortal
                size="small"
                options={projectMembers}
                onChange={(e, selectedMember) => {
                  if (selectedMember) {
                    setFormFields({
                      ...formFields,
                      assigned_to: selectedMember.user_id,
                    });
                  }
                }}
                renderOption={(props, option) => {
                  return (
                    <MuiGrid container {...props}>
                      <MuiGrid item>
                        <Avatar
                          src={option.photo_url}
                          sx={{ width: "24px", height: "24px" }}
                        />
                      </MuiGrid>
                      <MuiGrid item sx={{ paddingLeft: "8px" }}>
                        <MuiTypography variant="body2">
                          {option.name}
                        </MuiTypography>
                      </MuiGrid>
                    </MuiGrid>
                  );
                }}
                getOptionLabel={(option) => {
                  return option.name;
                }}
                renderInput={(params) => {
                  return <TextField name="assigned_to" {...params} />;
                }}
                fullWidth
                required
              />
            </MuiGrid> */}
            <MuiGrid item xs={12} sm={6}>
              <IssuePrioritySelector
                title="Priority"
                handleChange={handleChange}
                value={formFields.priority}
              />
            </MuiGrid>
            <MuiGrid item xs={12} sm={6}>
              <DatePicker
                name="due_date"
                title="Due Date"
                minDate={new Date()}
                value={formFields.due_date}
                getOptionLabel={(option) => {
                  return `${option.name}`;
                }}
                onChange={(date) => {
                  return setFormFields({ ...formFields, due_date: date });
                }}
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
              <MuiButton
                variant="contained"
                type="submit"
                size="large"
                fullWidth
              >
                Create Issue
              </MuiButton>
            </MuiGrid>
          </MuiGrid>
        </MuiBox>
      </MuiGrid>
    </MuiGrid>
  );
};

export default IssueForm;
