import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Grid, Box, Typography, Tabs, Tab } from "@mui/material";
import AppBarContainer from "../appbar/appbar.component";
import TabPanel from "../tabpanel/tabpanel.component";
import IssueDetailed from "../issue-detailed/issue-detailed.component";

const Project = () => {
  const { projectId, members } = useParams();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(members ? 1 : 0);
  const [project, setProject] = useState({});

  const handleChange = (event, newValue) => {
    const mapIndexToTab = {
      0: `/projects/${projectId}`,
      1: `/projects/${projectId}/members`,
    };

    navigate(`${mapIndexToTab[newValue]}`);
    setSelectedTab(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:4000/api/projects/${projectId}`
      );
      const data = await response.json();
      setProject(data);
    };
    fetchData();
  }, [projectId]);

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

        <TabPanel selectedTab={selectedTab} index={0}>
          <IssueDetailed projectId={projectId} />
        </TabPanel>
        <TabPanel selectedTab={selectedTab} index={1}>
          <Outlet />
        </TabPanel>
      </Grid>
    </Grid>
  );
};

export default Project;
