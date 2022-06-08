import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setIssue } from "../../redux/issue/issue.action-creator";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import PageTitle from "../page-title/page-title.component";
import StyledAppBar from "../styled-appbar/styled-appbar.component";
import PageDescription from "../page-description/page-description.component";

const Issue = (props) => {
  const params = useParams();
  const navigate = useNavigate();

  const { issueId } = params;
  const { issue, dispatch } = props;

  useEffect(() => {
    if (issueId !== "board") {
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
    }
  }, []);

  return (
    <Grid container>
      <Grid item xs={12} sx={{ margin: 3, marginBottom: 0 }}>
        <Breadcrumbs>
          <Link
            onClick={() => {
              navigate(`/projects`);
            }}
            underline="hover"
            sx={{ cursor: "pointer" }}
          >
            <Typography variant="body2">projects</Typography>
          </Link>
          <Link
            onClick={() => {
              navigate(`/project/${issue.projectId}/overview`);
            }}
            underline="hover"
            sx={{ cursor: "pointer" }}
          >
            <Typography variant="body2">
              {issue.projectName && issue.projectName.toLowerCase()}
            </Typography>
          </Link>
          <Link
            onClick={() => {
              navigate(`/project/${issue.projectId}/issues`);
            }}
            underline="hover"
            sx={{ cursor: "pointer" }}
          >
            <Typography variant="body2">issues</Typography>
          </Link>
          <Typography variant="body2">{issue.id}</Typography>
        </Breadcrumbs>
      </Grid>
      <Grid item xs={12}>
        <StyledAppBar>
          <PageTitle
            page={issue}
            issueId={issue.id}
            projectId={issue.projectId}
            type="issue"
          />
        </StyledAppBar>
      </Grid>
      <Grid item xs={12} sx={{ margin: 3, marginTop: 0 }}>
        <PageDescription page={issue} type="issue" />
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
