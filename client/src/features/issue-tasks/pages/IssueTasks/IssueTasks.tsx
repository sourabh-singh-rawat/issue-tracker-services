import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useOutletContext, useParams } from "react-router-dom";

import MuiGrid from "@mui/material/Grid";

import TabPanel from "../../../../common/components/TabPanel";
import TaskList from "../../components/TaskList";

import { setTasks } from "../../issue-tasks.slice";
import { useAppSelector } from "../../../../common/hooks";
import { useGetIssueTaskListQuery } from "../../../../api/generated/issue.api";

function IssueTasks() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedTab] = useOutletContext();

  const {
    data: taskList,
    isSuccess,
    isLoading,
  } = useGetIssueTaskListQuery({ id });

  useEffect(() => {
    if (isSuccess && taskList) {
      dispatch(setTasks(taskList.rows));
    }
  }, [taskList]);

  return (
    <TabPanel index={1} selectedTab={selectedTab}>
      <MuiGrid rowSpacing={3} container>
        <MuiGrid xs={12} item>
          <TaskList
            isLoading={isLoading}
            rowCount={taskList?.rowCount}
            rows={taskList?.rows}
            title="To do:"
          />
        </MuiGrid>
        {/* Completed Issue Tasks */}
        <MuiGrid xs={12} item />
      </MuiGrid>
    </TabPanel>
  );
}

export default IssueTasks;
