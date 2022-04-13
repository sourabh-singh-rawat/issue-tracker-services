import { Box, Button, Grid } from "@mui/material";
import AppBarContainer from "../../components/appbar-container/appbar-container.component";
import AddIcon from "@mui/icons-material/Add";

const CreateTeamButton = () => {
  return (
    <Button color="primary" startIcon={<AddIcon />} sx={{ marginLeft: "auto" }}>
      Create
    </Button>
  );
};

const Teams = () => {
  return (
    <Box>
      <AppBarContainer element={<CreateTeamButton />}>Teams</AppBarContainer>
      <Grid container>
        <Grid item></Grid>
      </Grid>
    </Box>
  );
};

export default Teams;
