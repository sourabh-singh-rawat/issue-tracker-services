import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import StyledAppBar from "../../components/StyledAppbar/StyledAppbar";

const Teams = () => {
  return (
    <Box>
      <StyledAppBar button={{ to: "/teams/create", p: "Create team" }}>
        Teams
      </StyledAppBar>
      <Grid container>
        <Grid item></Grid>
      </Grid>
    </Box>
  );
};

export default Teams;
