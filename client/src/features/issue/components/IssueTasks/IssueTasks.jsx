import { useOutletContext } from "react-router-dom";

import TabPanel from "../../../../common/TabPanel";
import Task from "../../../../common/Task/Task";
import AddTask from "../AddTask";

export default function IssueTasks() {
  const [selectedTab] = useOutletContext();
  return (
    <TabPanel selectedTab={selectedTab} index={1}>
      <AddTask />
      <Task />
    </TabPanel>
  );
}
