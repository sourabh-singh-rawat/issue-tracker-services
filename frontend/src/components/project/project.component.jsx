import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import StyledTab from "../styled-tab/styled-tab.component";
import StyledTabs from "../styled-tabs/styled-tabs.component";
import StyledAppBar from "../styled-appbar/styled-appbar.component";
import Snackbar from "@mui/material/Snackbar";
import { setProject } from "../../redux/project/project.action-creator";
import PageTitle from "../page-title/page-title.component";

const Project = (props) => {
  // hooks
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // state and props
  const { project, dispatch } = props;

  // projectId
  const { projectId } = params;

  const path = location.pathname.split("/");
  const tabName = path[3];

  const mapTabNameToIndex = {
    overview: 0,
    issues: 1,
    people: 2,
    activity: 3,
  };

  const [selectedTab, setSelectedTab] = useState(mapTabNameToIndex[tabName]);

  const handleChange = (e, newValue) => {
    const mapIndexToTab = {
      0: `/project/${projectId}/overview`,
      1: `/project/${projectId}/issues`,
      2: `/project/${projectId}/people`,
      3: `/project/${projectId}/activity`,
    };

    navigate(`${mapIndexToTab[newValue]}`);
    setSelectedTab(newValue);
  };

  useEffect(() => {
    setSelectedTab(mapTabNameToIndex[tabName]);

    fetch(`http://localhost:4000/api/projects/${projectId}`)
      .then((response) => {
        if (response.status === 200) return response.json();
      })
      .then((data) => {
        dispatch(setProject({ ...data }));
      });
  }, [tabName, projectId]);

  return (
    <Grid container>
      <Grid item xs={12} sx={{ margin: 3, marginBottom: 0 }}>
        <Breadcrumbs>
          <Link
            onClick={() => {
              navigate(`/projects`);
            }}
            underline="hover"
            sx={{ ":hover": { cursor: "pointer" } }}
          >
            <Typography variant="body2">projects</Typography>
          </Link>
          <Link
            onClick={(e) => {
              navigate(`/project/${projectId}/overview`);
              setSelectedTab(0);
            }}
            underline="hover"
            sx={{ ":hover": { cursor: "pointer" } }}
          >
            <Typography variant="body2">
              {project.name.toLowerCase()}
            </Typography>
          </Link>
          <Typography variant="body2">{tabName}</Typography>
        </Breadcrumbs>
      </Grid>
      <StyledAppBar>
        <PageTitle
          page={project}
          dispatch={dispatch}
          projectId={projectId}
          type="project"
        />
      </StyledAppBar>
      <Grid item xs={12} sx={{ marginLeft: 3, marginRight: 3 }}>
        <Box>
          <StyledTabs value={selectedTab} onChange={handleChange}>
            <StyledTab label="Overview" value={0} />
            <StyledTab label="Issues" value={1} />
            <StyledTab label="People" value={2} />
            <StyledTab label="Activity" value={3} />
          </StyledTabs>
        </Box>
        {/* styled tab panels */}
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
