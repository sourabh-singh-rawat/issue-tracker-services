import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { Box, Grid, Button, Toolbar, Typography } from "@mui/material";
import StyledSelect from "../StyledSelect/StyledSelect";
import StyledTextField from "../StyledTextField/StyledTextField";
import StyledDatePicker from "../StyledDatePicker/StyledDatePicker";

const ProjectForm = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const [email, setEmail] = useState("Unassigned");
  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    owner_email: email,
    owner_uid: "",
    status: "",
    start_date: null,
    end_date: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (e) => {
    console.log(formFields);
    e.preventDefault();
    const response = await fetch("http://localhost:4000/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formFields),
    });
    const { id } = await response.json();
    if (response.status === 200) navigate(`/projects/${id}/overview`);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Toolbar disableGutters>
          <Button
            variant="text"
            startIcon={<ArrowBack />}
            onClick={() => navigate("/projects")}
            sx={{
              color: "text.subtitle1",
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            Back to all projects
          </Button>
        </Toolbar>
        <Toolbar disableGutters>
          <Typography sx={{ fontWeight: "600", fontSize: "30px" }}>
            New Project
          </Typography>
        </Toolbar>
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="body2"
          sx={{ color: "text.subtitle1", marginBottom: 2 }}
        >
          Projects are container for storing issues.
        </Typography>
      </Grid>
      <Grid item sm={12}>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container rowSpacing={2} columnSpacing={3}>
            <Grid item xs={12} sm={12} md={12}>
              <StyledTextField
                title="Name"
                name="name"
                type="text"
                onChange={handleChange}
                helperText="A name for your project"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <StyledDatePicker
                title="Start Date"
                name="start_date"
                value={formFields.start_date}
                maxDate={formFields.end_date}
                onChange={(date) =>
                  setFormFields({ ...formFields, start_date: date })
                }
                helperText="Set a start date for your project"
                handleChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <StyledDatePicker
                title="End Date"
                name="end_date"
                value={formFields.end_date}
                minDate={formFields.start_date}
                onChange={(date) =>
                  setFormFields({ ...formFields, end_date: date })
                }
                helperText="Set an end date for your project"
                handleChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <StyledSelect
                title="Status"
                name="status"
                value={formFields.status}
                onChange={handleChange}
                items={["Not Started", "Open", "Completed", "Paused"]}
                helperText="Current status of your project."
                defaultValue={"Not Started"}
              />
            </Grid>
            <Grid item md={6}></Grid>
            <Grid item xs={12} sm={12} md={6}>
              <StyledTextField
                title="Email"
                name="owner_email"
                type="email"
                value={email}
                onChange={handleChange}
                disabled
                helperText="project owner's email"
                required
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <StyledTextField
                name="Description"
                type="text"
                onChange={handleChange}
                rows={4}
                helperText="A text description of your project. Do not exceed 150 characters"
                multiline
              />
            </Grid>
          </Grid>
          <Grid container margin={2} marginLeft={0}>
            <Grid item>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{ textTransform: "none", fontWeight: "bold" }}
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

export default ProjectForm;
