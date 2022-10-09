import { useState, useEffect } from "react";
import { useLocation, useNavigate, Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import MuiGrid from "@mui/material/Grid";
import MuiButton from "@mui/material/Button";
import MuiToolbar from "@mui/material/Toolbar";
import MuiTypography from "@mui/material/Typography";
import MuiArrowBackIcon from "@mui/icons-material/ArrowBack";

import Tab from "../../../../common/Tab";
import Tabs from "../../../../common/Tabs";

import { setCurrent } from "../../team.slice";

import { useGetTeamQuery } from "../../team.api";

const Team = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const team = useGetTeamQuery();
  const { id } = useParams();
  const { name } = useSelector((store) => store.team.current);
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
    if (team.data) dispatch(setCurrent(team.data));
  }, [team.data]);

  return (
    <MuiGrid container>
      <MuiGrid item xs={12}>
        <MuiToolbar disableGutters>
          <MuiButton
            variant="text"
            startIcon={<MuiArrowBackIcon />}
            onClick={() => navigate("/teams")}
            sx={{
              color: "text.subtitle1",
              fontWeight: 600,
              textTransform: "none",
            }}
          >
            Back to all teams
          </MuiButton>
        </MuiToolbar>
      </MuiGrid>
      <MuiGrid item xs={12}>
        <MuiToolbar disableGutters>
          <MuiTypography variant="h4" sx={{ fontWeight: 600 }}>
            {name}
          </MuiTypography>
        </MuiToolbar>
      </MuiGrid>
      <MuiGrid item xs={12}>
        <Tabs value={selectedTab} onChange={handleChange}>
          <Tab label="Quick Start" value={0} />
          <Tab label="Projects" value={101} />
          <Tab label="People" value={1} />
          <Tab label="Activity" value={2} />
          <Tab label="Settings" value={3} />
        </Tabs>
      </MuiGrid>
      <MuiGrid item xs={12}>
        <Outlet context={[selectedTab]} />
      </MuiGrid>
    </MuiGrid>
  );
};

export default Team;
