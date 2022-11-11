import MuiGrid from "@mui/material/Grid";

import IssueCard from "../../../../../common/IssueCard";

const IssueStats = ({ issuesStatusCount, isLoading }) => {
  const total = issuesStatusCount.reduce(
    (prev, cur) => prev + parseInt(cur.count),
    0
  );

  return (
    <MuiGrid
      container
      spacing={1}
      sx={{
        marginTop: "10px",
        borderRadius: "6px",
      }}
    >
      <MuiGrid item xs={12} md={2.4}>
        <IssueCard title="Total Issues" count={total} isLoading={isLoading} />
      </MuiGrid>
      {issuesStatusCount.map(({ message, count, status }) => {
        return (
          <MuiGrid
            item
            key={message + status.toString()}
            xs={6}
            sm={6}
            md={2.4}
          >
            <IssueCard
              key={message}
              title={message}
              count={count}
              isLoading={isLoading}
            />
          </MuiGrid>
        );
      })}
    </MuiGrid>
  );
};

export default IssueStats;
