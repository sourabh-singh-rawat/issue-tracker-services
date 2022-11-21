import { useOutletContext } from "react-router-dom";
import TabPanel from "../../../../common/TabPanel";

const TeamActivity = () => {
  const [selectedTab] = useOutletContext();

  return (
    <TabPanel selectedTab={selectedTab} index={3}>
      Team Activity
    </TabPanel>
  );
};

export default TeamActivity;
