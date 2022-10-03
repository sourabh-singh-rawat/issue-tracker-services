import { useOutletContext } from "react-router-dom";
import TabPanel from "../../../../common/TabPanel";

export default function IssueTasks() {
  const [selectedTab] = useOutletContext();
  return (
    <TabPanel selectedTab={selectedTab} index={1}>
      Tasks
    </TabPanel>
  );
}
