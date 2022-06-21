import { Button, Grid, Toolbar, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, Outlet, useParams } from "react-router-dom";
import StyledTab from "../../components/StyledTab/StyledTab";
import StyledTabs from "../../components/StyledTabs/StyledTabs";
import { ArrowBack } from "@mui/icons-material";
import { setTeam } from "../../reducers/team.reducer";

const Team = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name } = useSelector((store) => store.team);

  const { pathname } = useLocation();
  const path = pathname.split("/")[3];

  const mapPathToIndex = {
    overview: 0,
    issues: 101,
    people: 1,
    activity: 2,
    settings: 3,
  };

  const mapIndexToTab = {
    0: `/teams/${id}/overview`,
    101: `/teams/${id}/issues`,
    1: `/teams/${id}/people`,
    2: `/teams/${id}/activity`,
    3: `/teams/${id}/settings`,
  };

  const [selectedTab, setSelectedTab] = useState(mapPathToIndex[path]);

  const handleChange = (e, newValue) => {
    navigate(`${mapIndexToTab[newValue]}`);
    setSelectedTab(newValue);
  };

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:4000/api/teams/${id}`);
      const data = await response.json();

      dispatch(setTeam(data));
    })();
  }, []);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Toolbar disableGutters>
          <Button
            variant="text"
            startIcon={<ArrowBack />}
            onClick={() => navigate("/teams")}
            sx={{
              color: "text.subtitle1",
              fontWeight: "bold",
              textTransform: "none",
            }}
          >
            Back to all teams
          </Button>
        </Toolbar>
      </Grid>
      <Grid item xs={12}>
        <Toolbar disableGutters>
          <Typography sx={{ fontSize: "30px", fontWeight: "bold" }}>
            {name}
          </Typography>
        </Toolbar>
      </Grid>
      <Grid item xs={12}>
        <StyledTabs value={selectedTab} onChange={handleChange}>
          <StyledTab label="Quick Start" value={0} />
          <StyledTab label="Projects" value={101} />
          <StyledTab label="People" value={1} />
          <StyledTab label="Activity" value={2} />
          <StyledTab label="Settings" value={3} />
        </StyledTabs>
      </Grid>
      <Grid item xs={12}>
        <Outlet context={[selectedTab]} />
      </Grid>
    </Grid>
  );
};

export default Team;
