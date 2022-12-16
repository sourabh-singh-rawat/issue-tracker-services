import { useOutletContext } from "react-router-dom";

import TabPanel from "../../../../common/tabs/TabPanel";

const TeamProjects = () => {
  const [selectedTab] = useOutletContext();
  return (
    <TabPanel selectedTab={selectedTab} index={1}>
      Team Projects
    </TabPanel>
  );
};

export default TeamProjects;
