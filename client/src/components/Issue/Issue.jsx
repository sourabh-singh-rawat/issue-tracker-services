import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIssue } from "../../redux/issue/issue.reducer";
import {
  Box,
  Link,
  Grid,
  Typography,
  Breadcrumbs,
  Toolbar,
} from "@mui/material";
import PageTitle from "../PageTitle/PageTitle";
import StyledTabs from "../StyledTabs/StyledTabs";
import StyledTab from "../StyledTab/StyledTab";

const Issue = ({ issue }) => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { issueId } = params;
  const tabName = location.pathname.split("/")[3];

  const mapTabToIndex = {
    overview: 0,
    open: 1,
    progress: 2,
    closed: 3,
  };

  const [selectedTab, setSelectedTab] = useState(mapTabToIndex[tabName]);

  useEffect(() => {
    setSelectedTab(mapTabToIndex[tabName]);
    (async () => {
      const response = await fetch(
        `http://localhost:4000/api/issues/${issueId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      dispatch(setIssue(data));
    })();
  }, [issueId, tabName]);

  const handleChange = (e, newValue) => {
    const mapIndexToTab = {
      0: `/issues/${issue.id}/overview`,
      1: `/issues/${issue.id}/open`,
      2: `/issues/${issue.id}/progress`,
      3: `/issues/${issue.id}/closed`,
    };

    navigate(`${mapIndexToTab[newValue]}`);
    setSelectedTab(newValue);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Toolbar disableGutters>
          <Breadcrumbs separator="•">
            {[
              { text: "projects", onClick: () => navigate(`/projects/all`) },
              {
                text: issue.project_name && issue.project_name.toLowerCase(),
                onClick: () =>
                  navigate(`/projects/${issue.project_id}/overview`),
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
                sx={{ cursor: "pointer" }}
              >
                <Typography>{text}</Typography>
              </Link>
            ))}
            <Typography>{issue.id}</Typography>
          </Breadcrumbs>
        </Toolbar>
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
            <StyledTab label="Open" value={1} />
            <StyledTab label="In Progress" value={2} />
            <StyledTab label="Closed" value={3} />
          </StyledTabs>
        </Box>
        <Outlet context={[selectedTab, issue]} />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (store) => {
  return {
    issue: store.issue,
  };
};

export default connect(mapStateToProps)(Issue);
