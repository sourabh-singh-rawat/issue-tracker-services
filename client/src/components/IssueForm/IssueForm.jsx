import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import {
  Box,
  Grid,
  Button,
  Select,
  MenuItem,
  TextField,
  Typography,
  FormControl,
  Autocomplete,
  Toolbar,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { enIN } from "date-fns/locale";

const IssueForm = ({ email }) => {
  const navigate = useNavigate();
  const uid = useSelector((store) => store.user.uid);
  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    status: "",
    priority: "",
    reporter: "",
    assigned_to: "",
    due_date: null,
    project_id: "",
    team_id: "",
  });
  const [projectNames, setProjectNames] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:4000/api/projects")
      .then((response) => response.json())
      .then((data) => {
        const projectNames = data.map(
          (project) => `${project.name} #${project.id}`
        );
        setProjectNames(projectNames);
      });
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:4000/api/issues", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formFields),
    });

    const { id } = await response.json();
    navigate(`/issues/${id}/overview`);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Toolbar disableGutters>
          <Typography variant="h6">Add an Issue</Typography>
        </Toolbar>
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="body1"
          sx={{ color: "primary.text3", marginBottom: 2 }}
        >
          Enter important details about the issue.
        </Typography>
      </Grid>
      <Grid container>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container rowSpacing={2} columnSpacing={3}>
            <Grid item xs={12} sm={12}>
              <Typography
                variant="body1"
                sx={{
                  color: "primary.text",
                  paddingBottom: 1,
                  fontWeight: "bold",
                }}
              >
                Name
              </Typography>
              <TextField
                name="name"
                onChange={handleChange}
                fullWidth
                required
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
                Description
              </Typography>
              <TextField
                name="description"
                rows={4}
                onChange={handleChange}
                multiline
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
                options={projectNames}
                onChange={(e, selectedOption) => {
                  if (selectedOption) {
                    const id = selectedOption.split("#")[1];
                    setFormFields({ ...formFields, project_id: id });
                  }
                }}
                renderInput={(params) => <TextField {...params} />}
                fullWidth
                required
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
                Reported By
              </Typography>
              <TextField
                name="reporter"
                value={email}
                disabled
                onChange={handleChange}
                fullWidth
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
              <FormControl fullWidth>
                <Select
                  name="assigned_to"
                  onChange={handleChange}
                  defaultValue=""
                  value={formFields.uid}
                >
                  {/* project memebers */}
                  <MenuItem value={uid}>Sourabh Singh Rawat</MenuItem>
                </Select>
              </FormControl>
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
                Priority
              </Typography>
              <FormControl fullWidth>
                <Select
                  name="priority"
                  onChange={handleChange}
                  defaultValue={""}
                >
                  <MenuItem value={"Low"}>Low</MenuItem>
                  <MenuItem value={"Medium"}>Medium</MenuItem>
                  <MenuItem value={"High"}>High</MenuItem>
                </Select>
              </FormControl>
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
                Due Date
              </Typography>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={enIN}
              >
                <DatePicker
                  value={formFields.due_date}
                  onChange={(date) =>
                    setFormFields({ ...formFields, due_date: date })
                  }
                  renderInput={(props) => <TextField {...props} />}
                />
              </LocalizationProvider>
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
                Status
              </Typography>
              <FormControl fullWidth>
                <Select name="status" onChange={handleChange} defaultValue={""}>
                  <MenuItem value={"Open"}>Open</MenuItem>
                  <MenuItem value={"In Progress"}>In Progress</MenuItem>
                  <MenuItem value={"Closed"}>Closed</MenuItem>
                </Select>
              </FormControl>
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

const mapStateToProps = (store) => {
  return { email: store.user.email };
};

export default connect(mapStateToProps)(IssueForm);
