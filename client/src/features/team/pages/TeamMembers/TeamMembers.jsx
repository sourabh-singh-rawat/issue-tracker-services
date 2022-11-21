import TabPanel from "../../../../common/TabPanel";
import { useOutletContext } from "react-router-dom";

const TeamMembers = () => {
  const [selectedTab] = useOutletContext();
  return (
    <TabPanel selectedTab={selectedTab} index={2}>
      Team Members
    </TabPanel>
  );
};

export default TeamMembers;
