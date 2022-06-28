import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Grid,
  Button,
  TextField,
  Typography,
  Autocomplete,
  Toolbar,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import StyledTextField from "../StyledTextField/StyledTextField";
import StyledSelect from "../StyledSelect/StyledSelect";
import StyledDatePicker from "../StyledDatePicker/StyledDatePicker";
import { onAuthStateChangedListener } from "../../config/firebase.config";
import {
  setIssueStatus,
  setIssuePriority,
} from "../../reducers/issueOptions.reducer";

const IssueForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const project = useSelector((store) => store.project);
  const issueStatus = useSelector((store) => store.issueOptions.issueStatus);
  const issuePriority = useSelector(
    (store) => store.issueOptions.issuePriority
  );
  const { id } = useParams();
  const { pathname } = useLocation();
  const [projects, setProjects] = useState([]);
  const [projectMembers, setProjectMembers] = useState([]);
  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    status: 0,
    priority: 0,
    reporter: null,
    assigned_to: null,
    due_date: null,
    project_id: "",
    team_id: "",
  });

  useEffect(() => {
    onAuthStateChangedListener(async (user) => {
      const token = await user.getIdToken();
      const fetchProjects = async () => {
        const projects = await fetch("http://127.0.0.1:4000/api/projects", {
          method: "GET",
          headers: {
            authorization: "Bearer " + token,
          },
        });
        const data = await projects.json();

        setProjects(data.rows);
      };

      !id && fetchProjects();
    });

    const fetchIssueStatus = async () => {
      const response = await fetch("http://localhost:4000/api/issues/status");
      const status = await response.json();

      dispatch(setIssueStatus(status));
    };

    const fetchIssuePriority = async () => {
      const response = await fetch("http://localhost:4000/api/issues/priority");
      const priority = await response.json();

      dispatch(setIssuePriority(priority));
    };

    fetchIssueStatus();
    fetchIssuePriority();
  }, []);

  useEffect(() => {
    const fetchProjectMembers = async () => {
      const response = await fetch(
        `http://localhost:4000/api/projects/${
          id || formFields.project_id
        }/members`
      );

      const members = await response.json();
      setProjectMembers(members.rows);
    };
    fetchProjectMembers();
  }, [formFields.project_id]);

  useEffect(() => {
    setFormFields({
      ...formFields,
      // reporter: user.uid,
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

    const response = await fetch("http://localhost:4000/api/issues", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formFields),
    });

    const { id } = await response.json();
    navigate(`/issues/${id}/overview`);
  };

  return (
    <Grid container>
      {pathname === "/issues/new" && (
        <Grid item xs={12}>
          <Toolbar disableGutters>
            <Button
              variant="text"
              startIcon={<ArrowBack />}
              onClick={() => navigate("/issues")}
              sx={{
                color: "text.subtitle1",
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              Back to all issues
            </Button>
          </Toolbar>
        </Grid>
      )}
      <Grid item xs={12}>
        <Toolbar disableGutters>
          <Typography variant="h4" sx={{ fontWeight: "600" }}>
            New Issue
          </Typography>
        </Toolbar>
        <Typography
          variant="body1"
          sx={{ color: "text.subtitle1", marginBottom: 2 }}
        >
          Issues are problem you need to solve
        </Typography>
      </Grid>
      <Grid item sm={12}>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container rowSpacing={2} columnSpacing={3}>
            <Grid item xs={12} sm={12}>
              <StyledTextField
                name="name"
                title="Name"
                onChange={handleChange}
                helperText="A title for the issue"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <StyledTextField
                name="description"
                title="Description"
                onChange={handleChange}
                helperText="A text description of the issue."
                multiline
                rows={4}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              {id ? (
                <StyledTextField
                  name="project_id"
                  title="Project"
                  value={project ? project.name : "loading"}
                  disabled
                />
              ) : (
                <>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "primary.text",
                      paddingBottom: 1,
                      fontWeight: "bold",
                    }}
                  >
                    Project
                  </Typography>
                  <Autocomplete
                    disablePortal
                    size="small"
                    options={projects}
                    onChange={(e, selectedProject) => {
                      if (selectedProject) {
                        setFormFields({
                          ...formFields,
                          project_id: selectedProject.id,
                        });
                      }
                    }}
                    getOptionLabel={(option) => {
                      return `${option.name} (${option.id.split("-")[0]})`;
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    fullWidth
                    required
                  />
                </>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                name="reporter"
                title="Reporter"
                value={user ? user.email : "none"}
                onChange={handleChange}
                helperText="This is the person who created this issue."
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="body1"
                sx={{
                  color: "primary.text",
                  paddingBottom: 1,
                  fontWeight: "bold",
                }}
              >
                Assigned To
              </Typography>
              <Autocomplete
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
                getOptionLabel={(option) => {
                  return `${option.email}`;
                }}
                renderInput={(params) => (
                  <TextField name="assigned_to" {...params} />
                )}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledSelect
                name="priority"
                title="Priority"
                onChange={handleChange}
                defaultValue={0}
                items={issuePriority}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledDatePicker
                name="due_date"
                title="Due Date"
                minDate={new Date()}
                value={formFields.due_date}
                getOptionLabel={(option) => {
                  return `${option.name}`;
                }}
                onChange={(date) =>
                  setFormFields({ ...formFields, due_date: date })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledSelect
                name="status"
                title="Status"
                items={issueStatus}
                defaultValue={0}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" type="submit" size="large" fullWidth>
                Create Issue
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default IssueForm;
