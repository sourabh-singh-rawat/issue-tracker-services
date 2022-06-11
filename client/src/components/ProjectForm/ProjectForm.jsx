import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import en_IN from "date-fns/locale/en-IN";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  Box,
  Grid,
  Select,
  Button,
  Toolbar,
  MenuItem,
  TextField,
  Typography,
  FormControl,
} from "@mui/material";

const ProjectForm = () => {
  const navigate = useNavigate();
  const { uid, email = "Unassigned" } = useSelector((store) => store.user);
  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    email,
    uid,
    status: "",
    start_date: null,
    end_date: null,
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = (e) => {
    console.log(formFields);
    e.preventDefault();
    fetch("http://localhost:4000/api/projects/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
        <Toolbar disableGutters>
          <Typography variant="h6">Add a new project</Typography>
        </Toolbar>
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="body1"
          sx={{ color: "primary.text3", marginBottom: 2 }}
        >
          Enter important details about your project to get started.
        </Typography>
      </Grid>
      <Grid item sm={12}>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container rowSpacing={2} columnSpacing={3}>
            <Grid item xs={12} sm={12} md={6}>
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
            <Grid item xs={12} sm={12} md={3}>
              <Typography
                variant="body1"
                sx={{
                  color: "primary.text",
                  paddingBottom: 1,
                  fontWeight: "bold",
                }}
              >
                Start Date
              </Typography>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={en_IN}
              >
                <DatePicker
                  value={formFields.start_date}
                  onChange={(date) => {
                    setFormFields({ ...formFields, start_date: date });
                  }}
                  maxDate={formFields.end_date}
                  renderInput={(params) => (
                    <TextField name="start_date" {...params} fullWidth />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <Typography
                variant="body1"
                sx={{
                  color: "primary.text",
                  paddingBottom: 1,
                  fontWeight: "bold",
                }}
              >
                End Date
              </Typography>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={en_IN}
              >
                <DatePicker
                  value={formFields.end_date}
                  onChange={(date) => {
                    setFormFields({ ...formFields, end_date: date });
                  }}
                  minDate={formFields.start_date}
                  renderInput={(params) => (
                    <TextField
                      name="end_date"
                      onChange={handleChange}
                      {...params}
                      fullWidth
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
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
                <Select
                  value={formFields.status}
                  name="status"
                  onChange={handleChange}
                  defaultValue="Not Started"
                  displayEmpty
                >
                  <MenuItem value="Not Started">Not Started</MenuItem>
                  <MenuItem value="Open">Open</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="Pasued">Paused</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Typography
                variant="body1"
                sx={{
                  color: "primary.text",
                  paddingBottom: 1,
                  fontWeight: "bold",
                }}
              >
                Owner Email
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
            <Grid item xs={12} sm={12} md={6}>
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
          </Grid>
          <Grid container margin={2} marginLeft={0}>
            <Grid item>
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

export default ProjectForm;
