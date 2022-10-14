import { useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import MuiGrid from "@mui/material/Grid";

import Task from "../../../../common/Task/Task";
import TabPanel from "../../../../common/TabPanel";
import AddTask from "../AddTask";

import { setTasks } from "../../issue.slice";
import { useGetIssueTasksQuery } from "../../issue.api";

export default function IssueTasks() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedTab] = useOutletContext();
  const getIssueTasks = useGetIssueTasksQuery(id);
  const issueTasks = useSelector((store) => store.issue.tasks.rows);

  useEffect(() => {
    if (getIssueTasks.isSuccess) {
      dispatch(setTasks(getIssueTasks.data));
    }
  }, [getIssueTasks.data]);

  return (
    <TabPanel selectedTab={selectedTab} index={1}>
      <AddTask />
      <MuiGrid container rowSpacing={1}>
        {issueTasks.map(({ ...otherProps }) => {
          return (
            <MuiGrid item xs={12}>
              <Task key={Math.random()} {...otherProps} />
            </MuiGrid>
          );
        })}
      </MuiGrid>
    </TabPanel>
  );
}
