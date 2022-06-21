import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { setIssue } from "../../reducers/issue.reducer";
import {
  Box,
  Link,
  Grid,
  Button,
  Toolbar,
  Typography,
  Breadcrumbs,
} from "@mui/material";
import PageTitle from "../PageTitle/PageTitle";
import StyledTabs from "../StyledTabs/StyledTabs";
import StyledTab from "../StyledTab/StyledTab";
import { ArrowBack } from "@mui/icons-material";

const Issue = () => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const issue = useSelector((store) => store.issue);

  const { id } = params;
  const tabName = location.pathname.split("/")[3];

  const mapTabToIndex = { overview: 0, tasks: 1, settings: 2 };

  const [selectedTab, setSelectedTab] = useState(mapTabToIndex[tabName]);

  useEffect(() => {
    setSelectedTab(mapTabToIndex[tabName]);
    (async () => {
      const response = await fetch(`http://localhost:4000/api/issues/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      dispatch(setIssue(data));
    })();
  }, [id, tabName]);

  const handleChange = (e, newValue) => {
    const mapIndexToTab = {
      0: `/issues/${issue.id}/overview`,
      1: `/issues/${issue.id}/tasks`,
      2: `/issues/${issue.id}/settings`,
    };

    navigate(`${mapIndexToTab[newValue]}`);
    setSelectedTab(newValue);
  };

  return (
    <Grid container>
      <Toolbar disableGutters>
        <Button
          variant="text"
          startIcon={<ArrowBack />}
          onClick={() => navigate("/issues")}
          sx={{
            color: "text.subtitle1",
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          Back to all Issues
        </Button>
      </Toolbar>
      <Grid item xs={12}>
        <Breadcrumbs separator="/">
          {[
            { text: "projects", onClick: () => navigate(`/projects`) },
            {
              text: issue.project_name && issue.project_name.toLowerCase(),
              onClick: () => navigate(`/projects/${issue.project_id}/overview`),
            },
            {
              text: "issues",
              onClick: () => navigate(`/projects/${issue.project_id}/issues`),
            },
          ].map(({ text, onClick }) => (
            <Link
              key={text}
              onClick={onClick}
              underline="hover"
              sx={{ cursor: "pointer", color: "text.subtitle1" }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: "bold", ":hover": { color: "text.main" } }}
              >
                {text}
              </Typography>
            </Link>
          ))}
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            {issue.id}
          </Typography>
        </Breadcrumbs>
      </Grid>
      <Grid item xs={12}>
        <Toolbar disableGutters>
          <PageTitle
            page={issue}
            issueId={issue.id}
            projectId={issue.projectId}
            type="issue"
          />
        </Toolbar>
      </Grid>
      <Grid item xs={12}>
        <Box>
          <StyledTabs value={selectedTab} onChange={handleChange}>
            <StyledTab label="Overview" value={0} />
            <StyledTab label="Tasks" value={1} />
            <StyledTab label="Settings" value={2} />
          </StyledTabs>
        </Box>
        <Outlet context={[selectedTab, issue]} />
      </Grid>
    </Grid>
  );
};

export default Issue;
