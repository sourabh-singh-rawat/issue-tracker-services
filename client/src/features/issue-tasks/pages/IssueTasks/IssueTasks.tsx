import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import TabPanel from "../../../../common/components/TabPanel";
import TaskList from "../../components/TaskList";

import { setTasks } from "../../issue-tasks.slice";
import { useGetIssueTaskListQuery } from "../../../../api/generated/issue.api";
import { useSelectedTab } from "../../../../common/hooks/useSelectedTab";
import { useTheme } from "@mui/material";

export default function IssueTasks() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { id, selectedTab } = useSelectedTab();

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
    <TabPanel index={1} selectedTab={selectedTab} sx={{ py: theme.spacing(2) }}>
      <TaskList
        rows={taskList?.rows}
        rowCount={taskList?.rowCount}
        isLoading={isLoading}
      />
    </TabPanel>
  );
}
