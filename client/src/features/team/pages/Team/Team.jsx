import { useState, useEffect } from "react";
import { useLocation, useNavigate, Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import MuiGrid from "@mui/material/Grid";
import MuiToolbar from "@mui/material/Toolbar";
import MuiTypography from "@mui/material/Typography";

import Tab from "../../../../common/tabs/Tab";
import Tabs from "../../../../common/tabs/Tabs";

import { useGetTeamQuery } from "../../api/team.api";
import { setTeam } from "../../slice/team.slice";

const Team = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const getTeamQuery = useGetTeamQuery(id);
  const team = useSelector((store) => store.team.info);
  const { pathname } = useLocation();
  const path = pathname.split("/")[3];

  const mapPathToIndex = {
    overview: 0,
    projects: 1,
    people: 2,
    activity: 3,
    settings: 4,
  };

  const mapIndexToTab = {
    0: `/teams/${id}/overview`,
    1: `/teams/${id}/projects`,
    2: `/teams/${id}/people`,
    3: `/teams/${id}/activity`,
    4: `/teams/${id}/settings`,
  };

  const [selectedTab, setSelectedTab] = useState(mapPathToIndex[path]);

  useEffect(() => {
    if (getTeamQuery.isSuccess) dispatch(setTeam(getTeamQuery.data));
  }, [getTeamQuery.data]);

  const handleChange = (e, newValue) => {
    navigate(`${mapIndexToTab[newValue]}`);
    setSelectedTab(newValue);
  };

  return (
    <MuiGrid container>
      <MuiGrid item xs={12}>
        <MuiToolbar disableGutters>
          <MuiTypography variant="h4" sx={{ fontWeight: 600 }}>
            {team.name}
          </MuiTypography>
        </MuiToolbar>
      </MuiGrid>
      <MuiGrid item xs={12}>
        <Tabs value={selectedTab} onChange={handleChange}>
          <Tab label="Overview" value={0} />
          <Tab label="Projects" value={1} />
          <Tab label="People" value={2} />
          <Tab label="Activity" value={3} />
          <Tab label="Settings" value={4} />
        </Tabs>
      </MuiGrid>
      <MuiGrid item xs={12}>
        <Outlet context={[selectedTab]} />
      </MuiGrid>
    </MuiGrid>
  );
};

export default Team;
