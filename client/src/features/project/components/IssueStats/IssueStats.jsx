import { Fragment } from "react";

import MuiGrid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Skeleton } from "@mui/material";

import IssueCard from "../../../../common/IssueCard";

export default function IssueStats({ issuesStatusCount, loading }) {
  const total = issuesStatusCount.reduce(
    (prev, cur) => prev + parseInt(cur.count),
    0
  );

  return (
    <Fragment>
      <Typography variant="body2" fontWeight={600}>
        Issue Status:
      </Typography>
      <MuiGrid
        container
        spacing={1}
        sx={{
          marginTop: "10px",
          borderRadius: "8px",
        }}
      >
        <MuiGrid item xs={12} md={2.4}>
          <IssueCard title="Total Issues" count={total} loading={loading} />
        </MuiGrid>
        {issuesStatusCount.map(({ message, count, status }) => {
          return (
            <MuiGrid item key={message + status.toString()} xs={12} md={2.4}>
              <IssueCard
                key={message}
                title={message}
                count={count}
                loading={loading}
              />
            </MuiGrid>
          );
        })}
      </MuiGrid>
    </Fragment>
  );
}
