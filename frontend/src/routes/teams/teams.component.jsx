import { Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import AppBarContainer from "../../components/appbar/appbar.component";

const Teams = () => {
  return (
    <Box>
      <AppBarContainer element={<Link to="/team/create">Create</Link>}>
        Teams
      </AppBarContainer>
      <Grid container>
        <Grid item></Grid>
      </Grid>
    </Box>
  );
};

export default Teams;
