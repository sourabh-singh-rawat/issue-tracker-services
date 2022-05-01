import { Grid, Box, Typography, TextField } from "@mui/material";

const TeamForm = () => {
  const handleSubmit = () => {};

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container columnSpacing={4} rowSpacing={2}>
        <Grid item sm={12}>
          <Typography variant="h4" fontWeight="bold">
            Create Team
          </Typography>
        </Grid>
        <Grid item sm={12}>
          <TextField name="teamName" label="Name" variant="outlined" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TeamForm;
