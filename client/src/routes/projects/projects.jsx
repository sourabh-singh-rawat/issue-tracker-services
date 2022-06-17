import { Button, Grid, Toolbar, Typography } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Plus } from "react-feather";

const Projects = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Grid container>
      {pathname === "/projects/all" && (
        <Grid item xs={12} sx={{ marginLeft: 3, marginRight: 3 }}>
          <Toolbar disableGutters>
            <Typography
              sx={{ fontWeight: "bold", fontSize: "30px", flexGrow: 1 }}
            >
              Projects
            </Typography>
            <Button
              variant="contained"
              sx={{ textTransform: "none", fontWeight: "bold" }}
              startIcon={<Plus />}
              onClick={() => navigate("/projects/create")}
            >
              Create Project
            </Button>
          </Toolbar>
          <Typography variant="body2" sx={{ color: "text.subtitle1" }}>
            This section contains all the projects that you have created. You
            can go to individual project to edit.
          </Typography>
        </Grid>
      )}
      <Grid item xs={12} sx={{ marginLeft: 3, marginRight: 3 }}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default Projects;
