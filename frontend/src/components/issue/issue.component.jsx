import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Grid } from "@mui/material";
import AppBarContainer from "../appbar/appbar.component";

const Issue = () => {
  const { issueId } = useParams();
  const [state, setState] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (issueId !== "board") {
        try {
          const response = await fetch(
            `http://localhost:4000/api/issues/${issueId}`,
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

  const { issuename, issuedescription } = state;

  return (
    <Grid container>
      <Grid item xs={12}>
        <AppBarContainer>{issuename}</AppBarContainer>
      </Grid>
      <Grid item xs={12}>
        {issuedescription}
      </Grid>
    </Grid>
  );
};

export default Issue;
