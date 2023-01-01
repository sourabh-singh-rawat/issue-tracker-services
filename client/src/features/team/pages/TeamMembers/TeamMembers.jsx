import React from 'react';
import { useOutletContext } from 'react-router-dom';
import TabPanel from '../../../../common/TabPanel';

function TeamMembers() {
  const [selectedTab] = useOutletContext();
  return (
    <TabPanel index={2} selectedTab={selectedTab}>
      Team Members
    </TabPanel>
  );
}

export default TeamMembers;
