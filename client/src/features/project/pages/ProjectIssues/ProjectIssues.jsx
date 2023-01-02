import React from 'react';
import { useOutletContext, useParams } from 'react-router-dom';

import MuiGrid from '@mui/material/Grid';
import IssueList from '../../../issue-list/components/IssueList';
import AddIssueButton from '../../../issue/components/AddIssueButton/AddIssueButton';
import TabPanel from '../../../../common/TabPanel';
import IssueStatusFilter from '../../../../common/IssueStatusFilter';
import IssuePriorityFilter from '../../../../common/IssuePriorityFilter';
import theme from '../../../../config/mui.config';

function ProjectIssues() {
  const [selectedTab] = useOutletContext();
  const { id } = useParams();

  return (
    <TabPanel index={1} selectedTab={selectedTab}>
      <MuiGrid spacing={1} container>
        <MuiGrid
          sx={{
            display: 'flex',
            backgroundColor: theme.palette.grey[1400],
            borderRadius: theme.shape.borderRadiusMedium,
            paddingBottom: '8px',
          }}
          xs={12}
          item
        >
          <MuiGrid columnSpacing={1} container>
            <MuiGrid item>
              <IssuePriorityFilter />
            </MuiGrid>
            <MuiGrid item>
              <IssueStatusFilter />
            </MuiGrid>
            <MuiGrid sx={{ flexGrow: 1 }} item />
            <MuiGrid item>
              <AddIssueButton />
            </MuiGrid>
            <MuiGrid item />
          </MuiGrid>
        </MuiGrid>
        <MuiGrid xs={12} item>
          <IssueList projectId={id} />
        </MuiGrid>
      </MuiGrid>
    </TabPanel>
  );
}

export default ProjectIssues;
