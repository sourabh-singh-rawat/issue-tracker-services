import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { setIssue } from "../../redux/issue/issue.action-creator";
import {
  Box,
  Link,
  Grid,
  Typography,
  Breadcrumbs,
  Toolbar,
} from "@mui/material";
import PageTitle from "../page-title/page-title.component";
import StyledTabs from "../styled-tabs/styled-tabs.component";
import StyledTab from "../styled-tab/styled-tab.component";

const Issue = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { issueId } = params;
  const { issue, dispatch } = props;
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
    fetch(`http://localhost:4000/api/issues/${issueId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        dispatch(setIssue(data));
      });
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
            <Link
              onClick={() => navigate(`/projects/all`)}
              underline="hover"
              sx={{ cursor: "pointer" }}
            >
              <Typography>projects</Typography>
            </Link>
            <Link
              onClick={() => navigate(`/projects/${issue.projectId}/overview`)}
              underline="hover"
              sx={{ cursor: "pointer" }}
            >
              <Typography>
                {issue.projectName && issue.projectName.toLowerCase()}
              </Typography>
            </Link>
            <Link
              onClick={() => navigate(`/projects/${issue.projectId}/issues`)}
              underline="hover"
              sx={{ cursor: "pointer" }}
            >
              <Typography>issues</Typography>
            </Link>
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
