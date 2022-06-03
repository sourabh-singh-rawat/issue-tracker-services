import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useTheme } from "@emotion/react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import StyledTab from "../styled-tab/styled-tab.component";
import StyledTabs from "../styled-tabs/styled-tabs.component";
import StyledAppBar from "../styled-appbar/styled-appbar.component";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Project = () => {
  // hooks
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  // state
  const [project, setProject] = useState({ name: "" });

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

    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:4000/api/projects/${projectId}?tab=issues`
      );
      const data = await response.json();
      setProject(data);
    };
    fetchData();
  }, [tabName, projectId]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Toolbar
          sx={{ borderBottom: `1px solid ${theme.palette.background.main}` }}
        >
          <Button
            href={`/projects`}
            underline="hover"
            startIcon={<ArrowBackIcon />}
            sx={{ textTransform: "none" }}
          >
            Back to all projects
          </Button>
        </Toolbar>
        {/* <Breadcrumbs>
          <Link href={`/projects`} underline="hover">
            projects
          </Link>
          <Link href={`/project/${projectId}/overview`} underline="hover">
            {project.name.toLowerCase()}
          </Link>
          <Typography>{tabName}</Typography>
        </Breadcrumbs> */}
      </Grid>
      <StyledAppBar>{project.name}</StyledAppBar>
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

export default Project;
