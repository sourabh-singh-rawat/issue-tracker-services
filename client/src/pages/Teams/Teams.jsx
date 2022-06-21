import { Button, Grid, Toolbar, Typography } from "@mui/material";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { Plus } from "react-feather";
import { ArrowBack } from "@mui/icons-material";

const Teams = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <>
      {pathname === "/teams" && (
        <Grid item xs={12}>
          <Toolbar disableGutters>
            <Typography
              sx={{ fontWeight: "bold", fontSize: "30px", flexGrow: 1 }}
            >
              Teams
            </Typography>
            <Button
              variant="contained"
              sx={{ textTransform: "none", fontWeight: "bold" }}
              startIcon={<Plus />}
              onClick={() => navigate("/teams/new")}
            >
              Create Teams
            </Button>
          </Toolbar>
          <Typography variant="body2" sx={{ color: "text.subtitle1" }}>
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
