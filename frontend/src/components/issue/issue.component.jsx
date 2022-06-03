import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import StyledAppBar from "../styled-appbar/styled-appbar.component";

const Issue = () => {
  const { issueId } = useParams();
  const [state, setState] = useState({});

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

  const { issue_name, issue_description } = state;

  return (
    <Grid container>
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
