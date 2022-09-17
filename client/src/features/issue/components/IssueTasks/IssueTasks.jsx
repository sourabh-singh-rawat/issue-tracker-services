import { useOutletContext } from "react-router-dom";
import TabPanel from "../../../../common/TabPanel";

const IssueTasks = () => {
  const [selectedTab] = useOutletContext();
  return (
    <TabPanel selectedTab={selectedTab} index={1}>
      Tasks
    </TabPanel>
  );
};

export default IssueTasks;
