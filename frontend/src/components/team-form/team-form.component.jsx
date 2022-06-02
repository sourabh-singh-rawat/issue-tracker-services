import { useState } from "react";
import { Grid, Box, Typography, TextField } from "@mui/material";
import AppBarContainer from "../appbar/appbar.component";

const TeamForm = () => {
  const [formFields, setFormFields] = useState({
    teamName: "",
    teamDescription: "",
  });

  const handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormFields({ ...formFields, [fieldName]: fieldValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: send state data to the server
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h4" fontWeight="bold">
        <AppBarContainer>Create Team</AppBarContainer>
      </Typography>
      <Grid container columnSpacing={4} rowSpacing={2}>
        <Grid item sm={12}>
          <TextField
            name="teamName"
            label="Team Name"
            onChange={handleChange}
            fullWidth
            required
          ></TextField>
        </Grid>
        <Grid item sm={12}>
          <TextField
            name="teamDescription"
            label="Team Description"
            rows={2}
            multiline
            fullWidth
          ></TextField>
        </Grid>
        <Grid item sm={12}></Grid>
      </Grid>
    </Box>
  );
};

export default TeamForm;
