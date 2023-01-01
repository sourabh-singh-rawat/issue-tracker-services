/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import MuiGrid from '@mui/material/Grid';
import MuiLinearProgress from '@mui/material/LinearProgress';

import Task from '../Task';
import AddTaskButton from '../AddTaskButton';

import { resetTasks } from '../../issue-tasks.slice';

function TaskList({ rows, isLoading }) {
  const dispatch = useDispatch();
  useEffect(() => () => dispatch(resetTasks()), []);

  return (
    <MuiGrid xs={12} item>
      {isLoading ? (
        <MuiLinearProgress />
      ) : (
        <>
          {/* <MuiLinearProgress /> */}
          {rows.map(({ id, ...otherProps }) => (
            <MuiGrid key={id} xs={12} item>
              <Task taskId={id} {...otherProps} />
            </MuiGrid>
          ))}
          <AddTaskButton />
        </>
      )}
    </MuiGrid>
  );
}

export default TaskList;
