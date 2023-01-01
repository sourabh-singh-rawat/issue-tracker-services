import React from 'react';
import { useOutletContext } from 'react-router-dom';
import TabPanel from '../../../../common/TabPanel';

function TeamProjects() {
  const [selectedTab] = useOutletContext();
  return (
    <TabPanel index={1} selectedTab={selectedTab}>
      Team Projects
    </TabPanel>
  );
}

export default TeamProjects;
