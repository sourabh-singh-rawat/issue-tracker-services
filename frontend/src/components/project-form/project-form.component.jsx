import { useState } from "react";
import { Grid, Box, Button, TextField, Typography } from "@mui/material";
import { connect } from "react-redux";

const ProjectForm = ({ uid, email = "Unassigned" }) => {
  const [formFields, setFormFields] = useState({
    projectName: "",
    projectDescription: "",
    projectOwnerUID: uid,
    projectOwnerEmail: email,
    startDate: null,
    endDate: null,
  });

  const handleChange = (e) => {
    const { name } = e.target;
    setFormFields({ ...formFields, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formFields);

    // TODO: Add validation

    await fetch("http://localhost:4000/api/projects", {
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
            Create Project
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            name="projectName"
            label="Project Name"
            variant="outlined"
            onChange={handleChange}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            name="projectDescription"
            label="Description"
            rows={4}
            onChange={handleChange}
            multiline
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            name="projectOwnerEmail"
            label="Owner"
            variant="outlined"
            value={email}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            autoFocus={true}
            fullWidth
            disabled
          />
        </Grid>
        <Grid item sm={12}></Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="startDate"
            label="Start Date"
            type="date"
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} paddingBottom="1em">
          <TextField
            name="endDate"
            label="End Date"
            type="date"
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" type="submit" size="large" fullWidth>
            Create Project
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    uid: state.user.uid,
    email: state.user.email,
  };
};

export default connect(mapStateToProps)(ProjectForm);
