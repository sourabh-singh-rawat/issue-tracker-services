import { useEffect, useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { Add } from "@mui/icons-material";
import { Button, Grid, Toolbar, Typography } from "@mui/material";

const Issues = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const [selectedTab, setSelectedTab] = useState(101);

  return (
    <Grid container>
      {pathname === "/issues" && (
        <>
          <Grid item xs={12}>
            <Toolbar disableGutters>
              <Typography variant="h4" sx={{ fontWeight: "bold", flexGrow: 1 }}>
                Issues
              </Typography>
              <Button
                variant="contained"
                sx={{ textTransform: "none", fontWeight: "bold" }}
                startIcon={<Add />}
                onClick={() => navigate("/issues/new")}
              >
                Create Issue
              </Button>
            </Toolbar>
            <Typography variant="body1" sx={{ color: "text.subtitle1" }}>
              This section contains all the issues that you have created.
            </Typography>
          </Grid>
        </>
      )}
      <Grid item xs={12}>
        <Outlet context={[selectedTab]} />
      </Grid>
    </Grid>
  );
};

export default Issues;
