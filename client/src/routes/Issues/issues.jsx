import { useEffect, useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { Button, Grid, Toolbar, Typography } from "@mui/material";
import StyledTab from "../../components/StyledTab/StyledTab";
import StyledTabs from "../../components/StyledTabs/StyledTabs";
import { Plus } from "react-feather";

const Issues = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const tab = pathname.split("/")[2];
  console.log(tab);

  const mapPathToIndex = {
    open: 1,
    progress: 2,
    closed: 3,
  };
  const [selectedTab, setSelectedTab] = useState(mapPathToIndex[tab] || 101);

  const handleChange = (e, newValue) => {
    const mapIndexToTab = {
      1: "open",
      2: "progress",
      3: "closed",
    };
    navigate(`${mapIndexToTab[newValue]}`);
    setSelectedTab(newValue);
  };

  useEffect(() => {
    setSelectedTab(mapPathToIndex[tab] || 101);
  }, [selectedTab]);

  return (
    <Grid container>
      {pathname === "/issues" && (
        <>
          <Grid item xs={12} sx={{ marginLeft: 3, marginRight: 3 }}>
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
                onClick={() => navigate("/issues/create")}
              >
                Create Issue
              </Button>
            </Toolbar>
            <Typography variant="body2" sx={{ color: "text.subtitle1" }}>
              This section contains all the issues that you have created.
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ marginLeft: 3, marginRight: 3 }}>
            <StyledTabs value={selectedTab} onChange={handleChange}>
              <StyledTab label="All Issues" value={101} />
              <StyledTab label="Open" value={1} />
              <StyledTab label="In Progress" value={2} />
              <StyledTab label="Closed" value={3} />
            </StyledTabs>
          </Grid>
        </>
      )}
      <Grid item xs={12} sx={{ marginLeft: 3, marginRight: 3 }}>
        <Outlet context={[selectedTab, undefined, tab]} />
      </Grid>
    </Grid>
  );
};

export default Issues;
