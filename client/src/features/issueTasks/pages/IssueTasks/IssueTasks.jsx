import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext, useParams } from "react-router-dom";

import MuiGrid from "@mui/material/Grid";

import AddTask from "../../components/containers/AddTask";
import TaskList from "../../components/containers/TaskList";
import TabPanel from "../../../../common/TabPanel";

import { setCompletedTasks, setIncompleteTasks } from "../../issueTasks.slice";
import { useGetTasksQuery } from "../../issueTask.api";

const IssueTasks = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [selectedTab] = useOutletContext();
  const issueTasks = useSelector((store) => store.issueTasks);
  const incompletedIssues = useGetTasksQuery({
    id,
    filters: { completed: false },
  });
  const completedIssues = useGetTasksQuery({
    id,
    filters: { completed: true },
  });

  useEffect(() => {
    if (completedIssues.isSuccess) {
      dispatch(setCompletedTasks(completedIssues.data));
    }
  }, [completedIssues.data]);

  useEffect(() => {
    if (incompletedIssues.isSuccess) {
      dispatch(setIncompleteTasks(incompletedIssues.data));
    }
  }, [incompletedIssues.data]);

  return (
    <TabPanel selectedTab={selectedTab} index={1}>
      <MuiGrid container rowSpacing={3}>
        <TaskList
          title="To do:"
          rows={issueTasks.incompleted.rows}
          loading={issueTasks.incompleted.loading}
        />
        <TaskList
          title="Completed:"
          rows={issueTasks.completed.rows}
          loading={issueTasks.completed.loading}
        />
        <MuiGrid item xs={12}>
          <AddTask />
        </MuiGrid>
      </MuiGrid>
    </TabPanel>
  );
};

export default IssueTasks;
