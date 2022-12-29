/* eslint-disable react/react-in-jsx-scope */
import { useOutletContext } from 'react-router-dom';

import TabPanel from '../../../../common/tabs/TabPanel';

function TeamActivity() {
  const [selectedTab] = useOutletContext();

  return (
    <TabPanel index={3} selectedTab={selectedTab}>
      Team Activity
    </TabPanel>
  );
}

export default TeamActivity;
