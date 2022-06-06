import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import ProjectList from "../../components/project-list/project-list.component";
import StyledAppBar from "../../components/styled-appbar/styled-appbar.component";

const Projects = (props) => {
  return (
    <Box sx={{ height: "100vh" }}>
      <StyledAppBar button={{ to: "/project/create", p: "Create project" }}>
        Projects
      </StyledAppBar>
      <Grid container sx={{ height: "85%" }}>
        <Grid
          item
          sm={12}
          sx={{
            border: "2px solid",
            borderColor: "background.main3",
            marginLeft: 3,
            marginRight: 3,
            borderRadius: 3,
            flexGrow: 1,
          }}
        >
          <ProjectList size={10} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Projects;
