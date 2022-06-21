import { useEffect, useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { Plus } from "react-feather";
import { Button, Grid, Toolbar, Typography } from "@mui/material";
import StyledTab from "../../components/StyledTab/StyledTab";
import StyledTabs from "../../components/StyledTabs/StyledTabs";

const Issues = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const [selectedTab, setSelectedTab] = useState(101);

  const handleChange = (e, newValue) => setSelectedTab(newValue);

  useEffect(() => {
    setSelectedTab(101);
  }, [selectedTab]);

  return (
    <Grid container>
      {pathname === "/issues" && (
        <>
          <Grid item xs={12}>
            <Toolbar disableGutters>
              <Typography
                sx={{ fontWeight: "bold", fontSize: "30px", flexGrow: 1 }}
              >
                Issues
              </Typography>
              <Button
                variant="contained"
                sx={{ textTransform: "none", fontWeight: "bold" }}
                startIcon={<Plus />}
                onClick={() => navigate("/issues/new")}
              >
                Create Issue
              </Button>
            </Toolbar>
            <Typography variant="body2" sx={{ color: "text.subtitle1" }}>
              This section contains all the issues that you have created.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <StyledTabs value={selectedTab} onChange={handleChange}>
              <StyledTab label="All Issues" value={101} />
              <StyledTab label="Open" value={1} />
              <StyledTab label="In Progress" value={2} />
              <StyledTab label="Closed" value={3} />
            </StyledTabs>
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
