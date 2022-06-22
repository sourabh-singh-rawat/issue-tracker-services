import { useState } from "react";
import { Grid, Typography, Toolbar, Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import StyledTextField from "../StyledTextField/StyledTextField";
import { Box } from "@mui/system";
import { setSnackbarOpen } from "../../reducers/snackbar.reducer";

const TeamForm = () => {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({ name: "", description: "" });

  const handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormFields({ ...formFields, [fieldName]: fieldValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:4000/api/teams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formFields),
    });

    const { id } = await response.json();

    if (response.status === 200) setSnackbarOpen(true);
    navigate(`/teams/${id}/overview`);
  };

  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          <Toolbar disableGutters>
            <Button
              variant="text"
              startIcon={<ArrowBack />}
              onClick={() => navigate("/teams")}
              sx={{
                color: "text.subtitle1",
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              Back to teams
            </Button>
          </Toolbar>
          <Toolbar disableGutters>
            <Typography variant="h4" sx={{ fontWeight: "600" }}>
              New Team
            </Typography>
          </Toolbar>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="body1"
            sx={{ color: "text.subtitle1", marginBottom: 2 }}
          >
            Create teams to organize people involved with your project.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid item sm={12}>
              <StyledTextField
                name="name"
                title="Name"
                helperText="The name for your team."
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item sm={12}>
              <StyledTextField
                name="description"
                title="Description"
                helperText="A text description of your team. Max character count is 150."
                onChange={handleChange}
                rows={4}
                multiline
              />
            </Grid>
            <Grid container marginTop={2}>
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ textTransform: "none", fontWeight: "bold" }}
                  fullWidth
                >
                  Create Team
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TeamForm;
