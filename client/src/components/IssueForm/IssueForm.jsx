import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
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

const IssueForm = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const [projectNames, setProjectNames] = useState([]);
  const { pathname } = useLocation();
  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    status: "Open",
    priority: "Low",
    reporter: user ? user.uid : null,
    assigned_to: null,
    due_date: null,
    project_id: "",
    team_id: "",
  });

  useEffect(() => {
    fetch("http://127.0.0.1:4000/api/projects")
      .then((response) => response.json())
      .then((data) => {
        const projectNames = data.map(
          (project) => `${project.name} (${project.id})`
        );
        setProjectNames(projectNames);
      });
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormFields({ ...formFields, [name]: value, uid: user.uid });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formFields);

    // const response = await fetch("http://localhost:4000/api/issues", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formFields),
    // });

    // const { id } = await response.json();
    // navigate(`/issues/${id}/overview`);
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
                helperText="A precise name for the issue"
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
                options={projectNames}
                onChange={(e, selectedOption) => {
                  if (selectedOption) {
                    const id = selectedOption.split("(")[1].slice(1, -1);
                    setFormFields({ ...formFields, project_id: id });
                  }
                }}
                renderInput={(params) => <TextField {...params} />}
                fullWidth
                required
              />
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
              <StyledSelect
                name="assigned_to"
                title="Assigned To"
                onChange={handleChange}
                items={["Sourabh Singh Rawat"]}
                // defaultValue=""
                // value={formFields.uid}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledSelect
                name="priority"
                title="Priority"
                onChange={handleChange}
                defaultValue="Low"
                items={["Low", "Medium", "High"]}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledDatePicker
                name="due_date"
                title="Dude Date"
                minDate={new Date()}
                value={formFields.due_date}
                onChange={(date) =>
                  setFormFields({ ...formFields, due_date: date })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledSelect
                name="status"
                title="Status"
                items={["Open", "In Progress", "Closed"]}
                defaultValue="Open"
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
