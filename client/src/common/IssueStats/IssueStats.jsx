import { Fragment } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import IssueCard from "../IssueCard";

export default function IssueStats({ issuesStatusCount }) {
  return (
    <Fragment>
      <Typography variant="body1" fontWeight="bold">
        Stats
      </Typography>
      <Grid
        container
        sx={{
          marginTop: "10px",
          border: "1px solid #E3E4E6",
          borderRadius: "6px",
          paddingLeft: "8px",
        }}
      >
        <IssueCard
          title="Total Issues"
          count={issuesStatusCount.reduce(
            (prev, cur) => prev + parseInt(cur.count),
            0
          )}
        />
        {issuesStatusCount.map(({ message, count }) => {
          return <IssueCard key={message} title={message} count={count} />;
        })}
      </Grid>
    </Fragment>
  );
}
