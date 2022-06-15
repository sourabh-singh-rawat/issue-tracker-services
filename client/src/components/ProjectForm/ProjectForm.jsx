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
  Button,
  Toolbar,
  TextField,
  Typography,
} from "@mui/material";
import StyledSelect from "../StyledSelect/StyledSelect";
import StyledTextField from "../StyledTextField/StyledTextField";
import StyledDatePicker from "../StyledDatePicker/StyledDatePicker";

const ProjectForm = () => {
  const navigate = useNavigate();
  const { uid, email = "Unassigned" } = useSelector((store) => store.user);
  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    owner_email: "",
    owner_uid: uid,
    status: "",
    start_date: null,
    end_date: null,
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (e) => {
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
              <StyledTextField
                name="Name"
                type="text"
                onChange={handleChange}
                helperText="Do not exceed 50 characters"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <StyledDatePicker
                name="start_date"
                value={formFields.start_date}
                maxDate={formFields.end_date}
                onChange={(date) =>
                  setFormFields({ ...formFields, start_date: date })
                }
                handleChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <StyledDatePicker
                name="end_date"
                value={formFields.end_date}
                minDate={formFields.start_date}
                onChange={(date) =>
                  setFormFields({ ...formFields, end_date: date })
                }
                handleChange={handleChange}
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
                Status
              </Typography>
              <StyledSelect
                name="status"
                value={formFields.status}
                onChange={handleChange}
                items={["Not Started", "Open", "Completed", "Paused"]}
                defaultValue={"Not Started"}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <StyledTextField
                name="Email"
                type="email"
                value={email}
                onChange={handleChange}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <StyledTextField
                name="Description"
                type="text"
                onChange={handleChange}
                rows={4}
                helperText="Do not exceed 100 characters"
                multiline
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
