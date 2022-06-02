import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { Grid, Box, Typography, Toolbar } from "@mui/material";
import AppBarContainer from "../appbar/appbar.component";
import StyledTabPanel from "../styled-tab-panel/styled-tab-panel.component";
import StyledTabs from "../styled-tabs/styled-tabs.component";
import StyledTab from "../styled-tab/styled-tab.component";

const Project = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const tabName = useLocation().pathname.split("/")[3];
  const [project, setProject] = useState({});
  const { name, description } = project;
  const mapTabNameToIndex = {
    issues: 1,
    people: 2,
  };
  const [selectedTab, setSelectedTab] = useState(
    tabName ? mapTabNameToIndex[tabName] : 0
  );

  const handleChange = (event, newValue) => {
    const mapIndexToTab = {
      0: `/project/${projectId}`,
      1: `/project/${projectId}/issues`,
      2: `/project/${projectId}/people`,
    };

    navigate(`${mapIndexToTab[newValue]}`);
    setSelectedTab(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:4000/api/projects/${projectId}?tab=issues`
      );
      const data = await response.json();
      setProject(data);
    };
    fetchData();
  }, [projectId]);

  useEffect(() => {
    setSelectedTab(tabName ? mapTabNameToIndex[tabName] : 0);
  }, [tabName]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Toolbar>Projects / {name}</Toolbar>
        <AppBarContainer>{name}</AppBarContainer>
      </Grid>
      <Grid item xs={12} sx={{ marginLeft: 3 }}></Grid>
      <Grid item xs={12} sx={{ marginLeft: 3, marginRight: 3 }}>
        <Box>
          <StyledTabs value={selectedTab} onChange={handleChange}>
            <StyledTab label="Description" />
            <StyledTab label="Issues" />
            <StyledTab label="People" />
          </StyledTabs>
        </Box>

        {/* styled tab panels */}
        <StyledTabPanel selectedTab={selectedTab} index={0}>
          <Typography variant="body2">{description}</Typography>
        </StyledTabPanel>
        <Outlet context={[selectedTab, project]} />
      </Grid>
    </Grid>
  );
};

export default Project;
