import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import StyledAppBar from "../styled-appbar/styled-appbar.component";

const Issue = () => {
  const params = useParams();
  const { issueId } = params;
  const [state, setState] = useState({});

  console.log(state);
  const { issue_name, issue_id, issue_description, project_id, name } = state;
  useEffect(() => {
    const fetchData = async () => {
      if (issueId !== "board") {
        try {
          const response = await fetch(
            `http://localhost:4000/api/issue/${issueId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const data = await response.json();
          setState(data);
        } catch (err) {
          console.log("cannot fetch data from server");
        }
      }
    };

    fetchData();
  }, [issueId]);

  return (
    <Grid container>
      <Grid item xs={12} sx={{ margin: 3, marginBottom: 0 }}>
        <Breadcrumbs>
          <Link href={`/projects`} underline="hover">
            <Typography variant="body2">projects</Typography>
          </Link>
          <Link href={`/project/${project_id}/overview`} underline="hover">
            <Typography variant="body2">
              {name && name.toLowerCase()}
            </Typography>
          </Link>
          <Link href={`/project/${project_id}/issues`} underline="hover">
            <Typography variant="body2">issues</Typography>
          </Link>
          <Typography variant="body2">{issue_id}</Typography>
        </Breadcrumbs>
      </Grid>
      <Grid item xs={12}>
        <StyledAppBar>{issue_name}</StyledAppBar>
      </Grid>
      <Grid item xs={12} sx={{ margin: 3 }}>
        <Typography>{issue_description}</Typography>
      </Grid>
    </Grid>
  );
};

export default Issue;
