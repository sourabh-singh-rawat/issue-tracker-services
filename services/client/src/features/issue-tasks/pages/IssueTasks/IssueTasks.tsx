import React from "react";

import { useTheme } from "@mui/material";
import TaskList from "../../components/TaskList";
import TabPanel from "../../../../common/components/TabPanel";

import { useSelectedTab } from "../../../../common/hooks/useSelectedTab";
import { useGetIssueTaskListQuery } from "../../../../api/generated/issue.api";

export default function IssueTasks() {
  const theme = useTheme();
  const { id, selectedTab } = useSelectedTab();

  const { data: taskList, isLoading } = useGetIssueTaskListQuery({ id });

  return (
    <TabPanel index={1} selectedTab={selectedTab} sx={{ py: theme.spacing(2) }}>
      <TaskList rows={taskList?.rows} isLoading={isLoading} />
    </TabPanel>
  );
}
