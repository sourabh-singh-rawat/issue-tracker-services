import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOutletContext, useParams } from 'react-router-dom';

import MuiGrid from '@mui/material/Grid';

import TabPanel from '../../../../common/tabs/TabPanel';
import TaskList from '../../components/containers/TaskList';

import { setTasks } from '../../slice/issue-tasks.slice';
import { useGetTasksQuery } from '../../api/issue-tasks.api';

function IssueTasks() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedTab] = useOutletContext();

  const issueTasks = useSelector((store) => store.issueTasks);

  const getTasksQuery = useGetTasksQuery({ id });

  useEffect(() => {
    if (getTasksQuery.isSuccess) {
      dispatch(setTasks(getTasksQuery.data));
    }
  }, [getTasksQuery.data]);

  return (
    <TabPanel index={1} selectedTab={selectedTab}>
      <MuiGrid rowSpacing={3} container>
        <MuiGrid xs={12} item>
          <TaskList
            isLoading={issueTasks.isLoading}
            rowCount={issueTasks.rowCount}
            rows={issueTasks.rows}
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
