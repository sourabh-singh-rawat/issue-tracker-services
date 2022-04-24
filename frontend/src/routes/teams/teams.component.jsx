import { Box, Grid } from "@mui/material";
import AppBarContainer from "../../components/appbar/appbar.component";
import ModalWindow from "../../components/modal-window/modal-window.component";
import TeamForm from "../../components/team-form/team-form.component";

const Teams = () => {
  return (
    <Box>
      <AppBarContainer
        element={
          <ModalWindow>
            <TeamForm />
          </ModalWindow>
        }
      >
        Teams
      </AppBarContainer>
      <Grid container>
        <Grid item></Grid>
      </Grid>
    </Box>
  );
};

export default Teams;
