import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import StyledAppBar from "../../components/styled-appbar/styled-appbar.component";

const Teams = () => {
  return (
    <Box>
      <StyledAppBar button={{ to: "/team/create", p: "Create team" }}>
        Teams
      </StyledAppBar>
      <Grid container>
        <Grid item></Grid>
      </Grid>
    </Box>
  );
};

export default Teams;
