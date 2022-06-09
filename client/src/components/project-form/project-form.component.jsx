import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import StyledAppBar from "../styled-appbar/styled-appbar.component";
import { FormControl, MenuItem, Select } from "@mui/material";

const ProjectForm = ({ uid, email = "Unassigned" }) => {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    email: email,
    uid: uid,
    startDate: "",
    endDate: "",
    status: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:4000/api/projects/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formFields),
    }).then((response) => {
      if (response.status === 200)
        response.json().then((data) => {
          navigate(`/project/${data.id}/overview`);
        });
    });
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <StyledAppBar>Add Project</StyledAppBar>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="body2" sx={{ color: "primary.text3" }}>
            In this section your can store important information about your
            project.
          </Typography>
        </Box>
      </Grid>
      <Grid item sm={12}>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container rowSpacing={2} columnSpacing={3}>
            <Grid item sm={6}>
              <Typography
                variant="body2"
                sx={{
                  color: "primary.text",
                  paddingBottom: 1,
                  fontWeight: "bold",
                }}
              >
                Project Name
              </Typography>
              <TextField
                helperText="Do not exceed 20 characters"
                name="name"
                onChange={handleChange}
                fullWidth
                sx={{
                  "& .MuiFormHelperText-contained": {
                    marginLeft: 0,
                  },
                }}
              />
            </Grid>
            <Grid item sm={3}>
              <Typography
                variant="body2"
                sx={{
                  color: "primary.text",
                  paddingBottom: 1,
                  fontWeight: "bold",
                }}
              >
                Start Date
              </Typography>
              <TextField
                name="startDate"
                type="date"
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item sm={3}>
              <Typography
                variant="body2"
                sx={{
                  color: "primary.text",
                  paddingBottom: 1,
                  fontWeight: "bold",
                }}
              >
                End Date
              </Typography>
              <TextField
                name="endDate"
                type="date"
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item sm={6}>
              <Typography
                variant="body2"
                sx={{
                  color: "primary.text",
                  paddingBottom: 1,
                  fontWeight: "bold",
                }}
              >
                Status
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={formFields.status}
                  name="status"
                  onChange={handleChange}
                  displayEmpty
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value={"Open"}>Open</MenuItem>
                  <MenuItem value={"In Progress"}>In Progress</MenuItem>
                  <MenuItem value={"Closed"}>Closed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={6}>
              <Typography
                variant="body2"
                sx={{
                  color: "primary.text",
                  paddingBottom: 1,
                  fontWeight: "bold",
                }}
              >
                Project Owner Email
              </Typography>
              <TextField
                name="email"
                value={email}
                onChange={handleChange}
                autoFocus={true}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item sm={6}>
              <Typography
                variant="body2"
                sx={{
                  color: "primary.text",
                  paddingBottom: 1,
                  fontWeight: "bold",
                }}
              >
                Project Description
              </Typography>
              <TextField
                name="description"
                helperText="Do not exceed 100 characters"
                rows={4}
                onChange={handleChange}
                multiline
                fullWidth
                sx={{
                  "& .MuiFormHelperText-contained": {
                    marginLeft: 0,
                  },
                }}
              />
            </Grid>
            <Grid item sm={6}>
              <Button
                variant="contained"
                type="submit"
                size="large"
                fullWidth
                sx={{ textTransform: "none" }}
              >
                Create Project
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    uid: state.user.uid,
    email: state.user.email,
  };
};

export default connect(mapStateToProps)(ProjectForm);
