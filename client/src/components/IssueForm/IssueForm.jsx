import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Autocomplete from "@mui/material/Autocomplete";

const IssueForm = ({ email }) => {
  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    status: "",
    priority: "",
    reporter: "",
    assignee: "",
    dueDate: "",
    projectId: "",
  });
  const [projectNames, setProjectNames] = useState([]);
  console.log(formFields);

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

    fetch("http://localhost:4000/api/issues/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formFields),
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container columnSpacing={4} rowSpacing={2}>
        <Grid item sm={12}>
          <Typography variant="h4" fontWeight="bold">
            Create Issue
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            name="name"
            label="Issue Name"
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            name="description"
            label="Description"
            rows={2}
            onChange={handleChange}
            multiline
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Autocomplete
            disablePortal
            options={projectNames}
            onChange={(e, selectedOption) => {
              if (selectedOption) {
                const id = selectedOption.split("#")[1];
                setFormFields({
                  ...formFields,
                  projectId: id,
                });
              }
            }}
            renderInput={(params) => (
              <TextField {...params} label="Project Name" />
            )}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Reporter</InputLabel>
            <Select
              name="reporter"
              label="Reporter"
              value={email}
              onChange={handleChange}
              defaultValue=""
            >
              {/* project memebers */}
              <MenuItem value={"Sourabh Singh Rawat"}>
                Sourabh Singh Rawat
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Assigned To</InputLabel>
            <Select
              name="assignee"
              label="Assigned To"
              onChange={handleChange}
              defaultValue=""
            >
              {/* project memebers */}
              <MenuItem value={"Sourabh Singh Rawat"}>
                Sourabh Singh Rawat
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select
              name="priority"
              label="Priority"
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
          <TextField
            name="dueDate"
            label="Due Date"
            type="date"
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              label="Status"
              onChange={handleChange}
              defaultValue={""}
            >
              <MenuItem value={"Open"}>Open</MenuItem>
              <MenuItem value={"In Progress"}>Completed</MenuItem>
              <MenuItem value={"Closed"}>Postponed</MenuItem>
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
  );
};

const mapStateToProps = (store) => {
  return { email: store.user.email };
};

export default connect(mapStateToProps)(IssueForm);
