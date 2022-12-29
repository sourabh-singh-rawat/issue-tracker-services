/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import MuiGrid from '@mui/material/Grid';
import theme from '../../../../../config/mui.config';

import IssueCard from '../../cards/IssueCard';

function IssueStats({ issuesStatusCount }) {
  const total = issuesStatusCount.reduce(
    (prev, cur) => prev + parseInt(cur.count, 10),
    0,
  );

  return (
    <MuiGrid
      columnSpacing={2}
      rowSpacing={1}
      sx={{
        marginTop: '10px',
        borderRadius: '6px',
      }}
      container
    >
      <MuiGrid md={2.4} xs={12} item>
        <IssueCard
          backgroundColor={theme.palette.primary.main}
          color={theme.palette.common.white}
          count={total}
          title="Total Issues"
        />
      </MuiGrid>
      {issuesStatusCount.map(({ id, name, count }) => (
        <MuiGrid key={id} md={2.4} sm={4} xs={6} item>
          <IssueCard count={count} title={name} />
        </MuiGrid>
      ))}
    </MuiGrid>
  );
}

export default IssueStats;
