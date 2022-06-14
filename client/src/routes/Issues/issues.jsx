import { useEffect, useState } from "react";
import {
  useNavigate,
  useLocation,
  Outlet,
  useSearchParams,
} from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import StyledTab from "../../components/StyledTab/StyledTab";
import StyledTabs from "../../components/StyledTabs/StyledTabs";
import StyledAppBar from "../../components/StyledAppbar/StyledAppbar";

const Issues = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [URLSearchParams] = useSearchParams();
  const { pathname } = location;

  const tab = URLSearchParams.get("tabs");
  console.log(tab);
  const mapPathToIndex = {
    all: 101,
    open: 1,
    progress: 2,
    closed: 3,
  };
  const [selectedTab, setSelectedTab] = useState(mapPathToIndex[tab]);

  const handleChange = (e, newValue) => {
    const mapIndexToTab = {
      101: "?tabs=all",
      1: "?tabs=open",
      2: "?tabs=progress",
      3: "?tabs=closed",
    };
    navigate(`${mapIndexToTab[newValue]}`);
    setSelectedTab(newValue);
  };

  useEffect(() => {
    setSelectedTab(mapPathToIndex[tab] || 101);
  }, [selectedTab]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <StyledAppBar button={{ to: "/issues/create", p: "Create issue" }}>
          Issues
        </StyledAppBar>
      </Grid>
      {pathname === "/issues" && (
        <>
          <Grid item xs={12} margin={3}>
            <Typography variant="body1" sx={{ color: "primary.text3" }}>
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
