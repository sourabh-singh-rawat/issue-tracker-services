import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext, useParams } from "react-router-dom";

import MuiGrid from "@mui/material/Grid";

import AddTask from "../../components/containers/AddTask";
import TaskList from "../../components/containers/TaskList";
import TabPanel from "../../../../common/TabPanel";

import { setTasks } from "../../issueTasks.slice";
import { useGetTasksQuery } from "../../issueTask.api";

const IssueTasks = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [selectedTab] = useOutletContext();
  const issueTasks = useSelector((store) => store.issueTasks);
  const getIssueTasks = useGetTasksQuery(id);

  useEffect(() => {
    if (getIssueTasks.isSuccess) {
      dispatch(setTasks(getIssueTasks.data));
    }
  }, [getIssueTasks.data]);

  return (
    <TabPanel selectedTab={selectedTab} index={1}>
      <MuiGrid container rowSpacing={1}>
        <MuiGrid item xs={12}>
          <AddTask />
        </MuiGrid>
        <MuiGrid item xs={12}>
          <TaskList rows={issueTasks.rows} loading={issueTasks.loading} />
        </MuiGrid>
      </MuiGrid>
    </TabPanel>
  );
};

export default IssueTasks;
