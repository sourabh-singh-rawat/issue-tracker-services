import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { Box, Button, Grid, Typography } from "@mui/material";
import { setSnackbarOpen } from "../../reducers/snackbar.reducer";
import { updateTeam } from "../../reducers/team.reducer";
import StyledTabPanel from "../StyledTabPanel/StyledTabPanel";
import StyledTextField from "../StyledTextField/StyledTextField";

const TeamSettings = () => {
  const [selectedTab] = useOutletContext();
  const team = useSelector((store) => store.team);
  const dispatch = useDispatch();

  const handleChange = ({ target: { name, value } }) => {
    dispatch(updateTeam({ [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description } = team;

    const response = await fetch(`http://localhost:4000/api/teams/${team.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    });

    if (response.status === 200) dispatch(setSnackbarOpen(true));
  };

  return (
    <StyledTabPanel selectedTab={selectedTab} index={3}>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container sx={{ marginTop: 3 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Basic Information
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container>
              <Grid item xs={12}>
                <StyledTextField
                  name="name"
                  title="Name"
                  value={team.name}
                  onChange={handleChange}
                  helperText="A name for your team"
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  name="id"
                  title="team ID"
                  value={team.id}
                  helperText="This is the UID of the team owner"
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  name="description"
                  title="Description"
                  value={team.description}
                  onChange={handleChange}
                  helperText="A text description of the project. Max character count is 150"
                  rows={4}
                  multiline
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container sx={{ marginTop: 3, marginBottom: 8 }}>
            <Grid item md={4} />
            <Grid item md={8}>
              <Button
                variant="contained"
                type="submit"
                sx={{ textTransform: "none", fontWeight: "bold" }}
              >
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </StyledTabPanel>
  );
};

export default TeamSettings;
