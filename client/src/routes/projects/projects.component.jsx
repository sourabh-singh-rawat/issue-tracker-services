import { Grid, Typography } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import StyledAppBar from "../../components/styled-appbar/styled-appbar.component";

const Projects = (props) => {
  const { pathname } = useLocation();
  const tabName = pathname.split("/")[2];

  return (
    <Grid container>
      <Grid item sm={12}>
        <StyledAppBar button={{ to: "/projects/create", p: "Create project" }}>
          Projects
        </StyledAppBar>
      </Grid>
      {pathname === "/projects/all" && (
        <Grid item sm={12} margin={3}>
          <Typography variant="body1" sx={{ color: "primary.text3" }}>
            This section contains all the projects that you have created. You
            can go to individual project to edit or your can double click on
            some cells to edit information directly from the table.
          </Typography>
        </Grid>
      )}
      <Grid
        item
        sm={12}
        sx={{
          marginLeft: 3,
          marginRight: 3,
        }}
      >
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default Projects;
