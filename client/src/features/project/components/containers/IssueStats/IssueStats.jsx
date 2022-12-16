import MuiGrid from "@mui/material/Grid";
import { theme } from "../../../../../config/mui.config";

import IssueCard from "../../cards/IssueCard";

const IssueStats = ({ issuesStatusCount }) => {
  const total = issuesStatusCount.reduce(
    (prev, cur) => prev + parseInt(cur.count),
    0
  );

  return (
    <MuiGrid
      container
      rowSpacing={1}
      columnSpacing={2}
      sx={{
        marginTop: "10px",
        borderRadius: "6px",
      }}
    >
      <MuiGrid item xs={12} md={2.4}>
        <IssueCard
          title="Total Issues"
          count={total}
          color={theme.palette.common.white}
          backgroundColor={theme.palette.primary.main}
        />
      </MuiGrid>
      {issuesStatusCount.map(({ id, name, count }) => {
        return (
          <MuiGrid item key={id} xs={6} sm={4} md={2.4}>
            <IssueCard title={name} count={count} />
          </MuiGrid>
        );
      })}
    </MuiGrid>
  );
};

export default IssueStats;
