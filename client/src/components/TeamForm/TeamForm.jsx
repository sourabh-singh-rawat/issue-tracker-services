import { useState } from "react";
import { Grid, Box, Typography, TextField } from "@mui/material";

const TeamForm = () => {
  const [formFields, setFormFields] = useState({ name: "", description: "" });

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
