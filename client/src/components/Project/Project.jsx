import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams, Outlet } from "react-router-dom";
import { setProject } from "../../redux/project/project.reducer";
import {
  Box,
  Grid,
  Link,
  Typography,
  Breadcrumbs,
  Toolbar,
} from "@mui/material";
import PageTitle from "../PageTitle/PageTitle";
import StyledTab from "../StyledTab/StyledTab";
import StyledTabs from "../StyledTabs/StyledTabs";

const Project = () => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const project = useSelector((store) => store.project);
  const dispatch = useDispatch();
  const { projectId } = params;
  const path = location.pathname.split("/")[3];

  const mapPathToIndex = {
    overview: 100,
    issues: 101,
    people: 102,
    activity: 103,
  };

  const [selectedTab, setSelectedTab] = useState(mapPathToIndex[path]);

  const handleChange = (e, newValue) => {
    const mapIndexToTab = {
      100: `/projects/${projectId}/overview`,
      101: `/projects/${projectId}/issues`,
      102: `/projects/${projectId}/people`,
      103: `/projects/${projectId}/activity`,
    };

    navigate(`${mapIndexToTab[newValue]}`);
    setSelectedTab(newValue);
  };

  useEffect(() => {
    setSelectedTab(mapPathToIndex[path]);

    (async () => {
      const response = await fetch(
        `http://localhost:4000/api/projects/${projectId}`,
        { method: "GET", "Content-Type": "application/json" }
      );
      const data = await response.json();
      if (response.status === 200) dispatch(setProject(data));
    })();
  }, [path, projectId]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Toolbar disableGutters>
          <Breadcrumbs separator="•">
            <Link
              onClick={() => navigate(`/projects/all`)}
              underline="hover"
              sx={{ ":hover": { cursor: "pointer" } }}
            >
              <Typography variant="body1">projects</Typography>
            </Link>
            <Link
              onClick={(e) => {
                navigate(`/projects/${projectId}/overview`);
                setSelectedTab(100);
              }}
              underline="hover"
              sx={{ ":hover": { cursor: "pointer" } }}
            >
              <Typography variant="body1">
                {project.name.toLowerCase()}
              </Typography>
            </Link>
            <Typography variant="body1">{path}</Typography>
          </Breadcrumbs>
        </Toolbar>
      </Grid>
      <Grid item xs={12}>
        <Toolbar disableGutters>
          <PageTitle page={project} projectId={projectId} type="project" />
        </Toolbar>
      </Grid>
      <Grid item xs={12}>
        <Box>
          <StyledTabs value={selectedTab} onChange={handleChange}>
            <StyledTab label="Overview" value={100} />
            <StyledTab label="Issues" value={101} />
            <StyledTab label="People" value={102} />
            <StyledTab label="Activity" value={103} />
          </StyledTabs>
        </Box>
        <Outlet context={[selectedTab, project]} />
      </Grid>
    </Grid>
  );
};

export default Project;
