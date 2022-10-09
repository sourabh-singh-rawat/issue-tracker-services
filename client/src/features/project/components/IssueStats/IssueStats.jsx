import { Fragment } from "react";

import MuiGrid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import IssueCard from "../../../../common/IssueCard";

export default function ProjectIssueStats({ issuesStatusCount }) {
  return (
    <Fragment>
      <Typography variant="body2" fontWeight={600}>
        Issue Status:
      </Typography>
      <MuiGrid
        container
        sx={{
          marginTop: "10px",
          border: "1px solid #E3E4E6",
          borderRadius: "6px",
        }}
      >
        <MuiGrid item xs={12} md={2.4}>
          <IssueCard
            title="Total Issues"
            count={issuesStatusCount.reduce(
              (prev, cur) => prev + parseInt(cur.count),
              0
            )}
          />
        </MuiGrid>
        {issuesStatusCount.map(({ message, count }) => {
          return (
            <MuiGrid item xs={12} md={2.4}>
              <IssueCard key={message} title={message} count={count} />
            </MuiGrid>
          );
        })}
      </MuiGrid>
    </Fragment>
  );
}
