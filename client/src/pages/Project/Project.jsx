import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams, Outlet } from "react-router-dom";
import { setProject } from "../../reducers/project.reducer";
import PageTitle from "../../components/PageTitle/PageTitle";
import StyledTab from "../../components/StyledTab/StyledTab";
import StyledTabs from "../../components/StyledTabs/StyledTabs";
import { Box, Grid, Toolbar, Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

const Project = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const project = useSelector((store) => store.project);
  const dispatch = useDispatch();
  const path = location.pathname.split("/")[3];

  const mapPathToIndex = {
    overview: 100,
    issues: 101,
    people: 102,
    activity: 103,
    settings: 104,
  };
  const mapIndexToTab = {
    100: `/projects/${id}/overview`,
    101: `/projects/${id}/issues`,
    102: `/projects/${id}/people`,
    103: `/projects/${id}/activity`,
    104: `/projects/${id}/settings`,
  };

  const [selectedTab, setSelectedTab] = useState(mapPathToIndex[path]);

  const handleChange = (e, newValue) => {
    navigate(`${mapIndexToTab[newValue]}`);
    setSelectedTab(newValue);
  };

  useEffect(() => {
    setSelectedTab(mapPathToIndex[path]);

    (async () => {
      const response = await fetch(`http://localhost:4000/api/projects/${id}`, {
        method: "GET",
        "Content-Type": "application/json",
      });
      const data = await response.json();
      if (response.status === 200) dispatch(setProject(data));
    })();
  }, [path, id]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Toolbar disableGutters>
          <Button
            variant="text"
            startIcon={<ArrowBack />}
            onClick={() => navigate("/projects")}
            sx={{
              color: "text.subtitle1",
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            Back to all projects
          </Button>
        </Toolbar>
      </Grid>
      <Grid item xs={12}>
        <Toolbar disableGutters>
          <PageTitle page={project} projectId={id} type="project" />
        </Toolbar>
      </Grid>
      <Grid item xs={12}>
        <Box>
          <StyledTabs value={selectedTab} onChange={handleChange}>
            <StyledTab label="Overview" value={100} />
            <StyledTab label="Issues" value={101} />
            <StyledTab label="People" value={102} />
            <StyledTab label="Activity" value={103} />
            <StyledTab label="Settings" value={104} />
          </StyledTabs>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Outlet context={[selectedTab, project]} />
      </Grid>
    </Grid>
  );
};

export default Project;
