import React from 'react';
import { useOutletContext } from 'react-router-dom';

import TabPanel from '../../../../common/TabPanel';

function TeamActivity() {
  const [selectedTab] = useOutletContext();

  return (
    <TabPanel index={3} selectedTab={selectedTab}>
      Team Activity
    </TabPanel>
  );
}

export default TeamActivity;
