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
      container
      rowSpacing={1}
      columnSpacing={2}
      sx={{
        marginTop: '10px',
        borderRadius: '6px',
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
      {issuesStatusCount.map(({ id, name, count }) => (
        <MuiGrid item key={id} xs={6} sm={4} md={2.4}>
          <IssueCard title={name} count={count} />
        </MuiGrid>
      ))}
    </MuiGrid>
  );
}

export default IssueStats;
