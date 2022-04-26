import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, Box, Typography, Tabs, Tab } from "@mui/material";
import AppBarContainer from "../appbar/appbar.component";
import TabPanel from "../tabpanel/tabpanel.component";
import ProjectIssues from "../project-issues/project-issues.component";
import ProjectMembers from "../project-members/project-members.component";

const mapTypeToIndex = {
  issues: 0,
  members: 1,
};

const Project = () => {
  const { id, type } = useParams();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(mapTypeToIndex[type]);
  const [project, setProject] = useState({});

  const handleChange = (event, newValue) => {
    const mapIndexToTab = {
      0: `/projects/${id}/issues`,
      1: `/projects/${id}/members`,
    };

    navigate(`${mapIndexToTab[newValue]}`);
    setSelectedTab(newValue);
  };

  const renderTabPanel = () => {
    switch (type) {
      case "issues":
        return (
          <TabPanel selectedTab={selectedTab} index={0}>
            <ProjectIssues></ProjectIssues>
          </TabPanel>
        );
      case "members":
        return (
          <TabPanel selectedTab={selectedTab} index={1}>
            <ProjectMembers></ProjectMembers>
          </TabPanel>
        );
      default:
        return <p>Nothing to render</p>;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:4000/api/projects/${id}`);
      const data = await response.json();
      setProject(data);
    };
    fetchData();
  }, [id]);

  const { name, description } = project;

  return (
    <Grid container>
      <Grid item xs={12}>
        <AppBarContainer>{name}</AppBarContainer>
      </Grid>
      <Grid item xs={12} padding="1em">
        <Typography variant="body2">{description}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Box position="static" sx={{ borderBottom: "3px solid #f4f4f4" }}>
          <Tabs value={selectedTab} onChange={handleChange}>
            <Tab label="Issues" />
            <Tab label="Members" />
          </Tabs>
        </Box>
        {renderTabPanel()}
      </Grid>
    </Grid>
  );
};

export default Project;
