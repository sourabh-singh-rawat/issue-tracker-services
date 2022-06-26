import { useEffect, useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChangedListener } from "../../config/firebase.config";
import { setIssueList } from "../../reducers/issueList.reducer";
import { Add } from "@mui/icons-material";
import { Button, Grid, Toolbar, Typography } from "@mui/material";
import IssuesList from "../../components/IssuesList/IssuesList";

const Issues = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
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
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default Issues;
