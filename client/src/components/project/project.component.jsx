import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams, Outlet } from "react-router-dom";
import { setProject } from "../../redux/project/project.action-creator";
import {
  Box,
  Grid,
  Link,
  Typography,
  Breadcrumbs,
  Toolbar,
} from "@mui/material";
import PageTitle from "../page-title/page-title.component";
import StyledTab from "../styled-tab/styled-tab.component";
import StyledTabs from "../styled-tabs/styled-tabs.component";

const Project = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { project, dispatch } = props;
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

    fetch(`http://localhost:4000/api/projects/${projectId}`)
      .then((response) => {
        if (response.status === 200) return response.json();
      })
      .then((data) => {
        dispatch(setProject(data));
      });
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

const mapStateToProps = (store) => {
  return {
    project: store.project,
  };
};

export default connect(mapStateToProps)(Project);
