import { Button, Grid, Toolbar, Typography } from "@mui/material";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { Add } from "@mui/icons-material";

const Teams = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <>
      {pathname === "/teams" && (
        <Grid item xs={12}>
          <Toolbar disableGutters>
            <Typography variant="h4" sx={{ fontWeight: "bold", flexGrow: 1 }}>
              Teams
            </Typography>
            <Button
              variant="contained"
              sx={{ textTransform: "none", fontWeight: "bold" }}
              startIcon={<Add />}
              onClick={() => navigate("/teams/new")}
            >
              Create Team
            </Button>
          </Toolbar>
          <Typography variant="body1" sx={{ color: "text.subtitle1" }}>
            Create teams to organize people involved with your project.
          </Typography>
        </Grid>
      )}
      <Grid item xs={12}>
        <Outlet />
      </Grid>
    </>
  );
};

export default Teams;
