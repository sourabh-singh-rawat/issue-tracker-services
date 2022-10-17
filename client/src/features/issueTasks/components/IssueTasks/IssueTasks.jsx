import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext, useParams } from "react-router-dom";

import MuiGrid from "@mui/material/Grid";

import AddTask from "../AddTask";
import TaskList from "../TaskList/TaskList";
import TabPanel from "../../../../common/TabPanel";

import { setTasks } from "../../../issueTasks/issueTasks.slice";
import { useGetIssueTasksQuery } from "../../issueTask.api";

const IssueTasks = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedTab] = useOutletContext();
  const issueTasks = useSelector((store) => store.issueTasks.rows);
  const getIssueTasks = useGetIssueTasksQuery(id);

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
          <TaskList rows={issueTasks} />
        </MuiGrid>
      </MuiGrid>
    </TabPanel>
  );
};

export default IssueTasks;
