import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";
import { Button, Grid, Toolbar, Typography } from "@mui/material";

const Projects = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Grid container>
      {pathname === "/projects" && (
        <Grid item xs={12}>
          <Toolbar disableGutters>
            <Typography variant="h4" sx={{ fontWeight: "bold", flexGrow: 1 }}>
              Projects
            </Typography>
            <Button
              variant="contained"
              sx={{ textTransform: "none", fontWeight: "bold" }}
              startIcon={<Add />}
              onClick={() => navigate("/projects/new")}
            >
              Create Project
            </Button>
          </Toolbar>
          <Typography variant="body1" sx={{ color: "text.subtitle1" }}>
            This section contains all the projects that you have created. You
            can go to individual project to edit.
          </Typography>
        </Grid>
      )}
      <Grid item xs={12}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default Projects;
