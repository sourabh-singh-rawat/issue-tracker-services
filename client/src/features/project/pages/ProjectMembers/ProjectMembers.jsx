import React from 'react';
import { useOutletContext } from 'react-router-dom';

import MuiGrid from '@mui/material/Grid';

import TabPanel from '../../../../common/tabs/TabPanel';
import MemberList from '../../components/containers/MemberList';

import InviteButton from '../../components/buttons/AddMemberButton';

function ProjectMembers() {
  const [selectedTab] = useOutletContext();

  return (
    <TabPanel index={2} selectedTab={selectedTab}>
      <MuiGrid spacing={1} container>
        <MuiGrid xs={12} item>
          <MuiGrid spacing={2} container>
            <MuiGrid flexGrow={1} item />
            <MuiGrid item>
              <InviteButton />
            </MuiGrid>
          </MuiGrid>
        </MuiGrid>
        <MuiGrid xs={12} item>
          <MemberList />
        </MuiGrid>
      </MuiGrid>
    </TabPanel>
  );
}

export default ProjectMembers;
