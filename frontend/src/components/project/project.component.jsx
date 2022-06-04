import { Fragment, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import StyledTab from "../styled-tab/styled-tab.component";
import StyledTabs from "../styled-tabs/styled-tabs.component";
import StyledAppBar from "../styled-appbar/styled-appbar.component";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Edit2 } from "react-feather";

const Project = () => {
  // hooks
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [project, setProject] = useState({
    id: "",
    name: "",
    description: "",
    owner_uid: "",
    owner_email: "",
    start_date: "",
    end_date: "",
  });
  const [projectNameSelected, setProjectNameSelected] = useState(false);

  // snackbar
  const handleSnackbarClose = () => setSnackbarOpen(false);

  // snackbar action
  const action = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleSnackbarClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );
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

  const handleEditChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProject({ ...project, [name]: value });
  };

  useEffect(() => {
    setSelectedTab(mapTabNameToIndex[tabName]);

    fetch(`http://localhost:4000/api/projects/${projectId}`)
      .then((response) => {
        if (response.status === 200) return response.json();
      })
      .then((project) => {
        setProject(project);
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
        {projectNameSelected ? (
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <TextField
              autoFocus
              name="name"
              value={project.name}
              onChange={handleEditChange}
              variant={"standard"}
            />
            <Button
              variant={"contained"}
              onClick={() => {
                if (project.name !== project.oldProjectName) {
                  // send update request to server
                  fetch(`http://localhost:4000/api/project/${projectId}`, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      field: "name",
                      newVal: project.name,
                    }),
                  }).then((response) => {
                    if (response.status === 200) setSnackbarOpen(true);
                  });
                }
                setProjectNameSelected(false);
              }}
              sx={{
                boxShadow: "none",
                marginLeft: "5px",
                textTransform: "none",
                ":hover": { boxShadow: "none" },
              }}
            >
              <Typography variant="body2">Save</Typography>
            </Button>
            <Button
              onClick={() => {
                setProject({ ...project, name: project.oldProjectName });
                setProjectNameSelected(false);
              }}
              sx={{
                color: "primary.text",
                textTransform: "none",
                marginLeft: "5px",
                backgroundColor: "background.main",
                ":hover": {
                  backgroundColor: "background.main2",
                },
              }}
            >
              <Typography variant="body2">Cancel</Typography>
            </Button>
          </Box>
        ) : (
          <Typography variant="h5" fontWeight="bold">
            {project.name}
            <IconButton
              onClick={() => {
                // save value in temp
                setProject({ ...project, oldProjectName: project.name });
                setProjectNameSelected(true);
              }}
              sx={{
                color: "background.main3",
                ":hover": {
                  color: "primary.main",
                },
              }}
            >
              <Edit2 width="24px" height="24px" />
            </IconButton>
          </Typography>
        )}
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
        {/* snackbar updated */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          action={action}
          onClose={handleSnackbarClose}
          message="Updated"
        />
      </Grid>
    </Grid>
  );
};

export default Project;
