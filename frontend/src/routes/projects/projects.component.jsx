// MUI Styles
import { Box, Grid, Button, Toolbar, Typography } from "@mui/material";
import AppBarContainer from "../../components/appbar-container/appbar-container.component";
import AddIcon from "@mui/icons-material/Add";

const CreateProjectButton = () => {
  return (
    <Button color="primary" startIcon={<AddIcon />} sx={{ marginLeft: "auto" }}>
      Create
    </Button>
  );
};

const Projects = (props) => {
  return (
    <Box>
      <AppBarContainer element={<CreateProjectButton />}>
        Projects
      </AppBarContainer>
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
