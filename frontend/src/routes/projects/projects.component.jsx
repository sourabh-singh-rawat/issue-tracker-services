// MUI Styles
import { Box, Grid, Toolbar, Typography } from "@mui/material";
import AppBarContainer from "../../components/appbar-container/appbar-container.component";
import CreateProject from "../../components/create-project/create-project.component";

const Projects = (props) => {
  return (
    <Box>
      <AppBarContainer element={<CreateProject />}>Projects</AppBarContainer>
      <Toolbar sx={{ borderBottom: "3px solid #f4f4f4" }}>
        <Typography>All Projects</Typography>
      </Toolbar>
      <Grid container>
        <Grid item></Grid>
      </Grid>
    </Box>
  );
};

export default Projects;
