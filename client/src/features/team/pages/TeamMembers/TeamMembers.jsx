import { useOutletContext } from "react-router-dom";

import TabPanel from "../../../../common/tabs/TabPanel";

const TeamMembers = () => {
  const [selectedTab] = useOutletContext();
  return (
    <TabPanel selectedTab={selectedTab} index={2}>
      Team Members
    </TabPanel>
  );
};

export default TeamMembers;
