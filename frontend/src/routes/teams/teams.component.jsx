import { Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";
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
