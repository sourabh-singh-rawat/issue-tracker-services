/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
import { formatISO } from 'date-fns';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import React, { useState } from 'react';

import MuiGrid from '@mui/material/Grid';
import MuiTypography from '@mui/material/Typography';
import theme from '../../../../config/mui.config';

import CancelButton from '../../../../common/CancelButton';
import DatePicker from '../../../../common/DatePicker';
import SaveButton from '../../../../common/SaveButton';
import TextField from '../../../../common/TextField';

import { useCreateTaskMutation } from '../../issue-tasks.api';

import { resetTasks } from '../../issue-tasks.slice';

function TaskForm({ setOpen }) {
  const { id } = useParams();
  const dispatch = useDispatch();

  const defaultDueDate = formatISO(new Date());
  const [task, setTask] = useState({
    description: '',
    dueDate: defaultDueDate,
  });

  const [createTask] = useCreateTaskMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleDateChange = (selectedDate) => {
    setTask({ ...task, dueDate: selectedDate });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (task.description.length > 0) {
      const { description, dueDate } = task;
      createTask({ issueId: id, description, dueDate, completed: false });
      dispatch(resetTasks());
    }
    // Resetting the task state after saving
    setTask({ ...task, dueDate: defaultDueDate, description: '' });
    setOpen(false);
  };

  return (
    <MuiGrid
      sx={{
        padding: '1rem',
        borderRadius: '6px',
        marginTop: '1rem',
        boxShadow: '0px 0px 7px 0px rgba(0,0,0,0.3)',
      }}
      xs={12}
      item
    >
      <MuiGrid columnSpacing={1} rowSpacing={2} container>
        <MuiGrid xs={12} item>
          <MuiTypography
            sx={{ color: theme.palette.text.primary }}
            variant="h6"
          >
            Create Task
          </MuiTypography>
        </MuiGrid>
        <MuiGrid lg={6} xs={12} item>
          <TextField
            name="title"
            placeholder="Title"
            size="small"
            title="Title"
            autoFocus
            fullWidth
            onChange={handleChange}
          />
        </MuiGrid>
        <MuiGrid lg={6} xs={0} item />
        <MuiGrid lg={6} xs={12} item>
          <TextField
            name="description"
            placeholder="Description"
            rows={4}
            size="small"
            title="Description"
            fullWidth
            multiline
            onChange={handleChange}
          />
        </MuiGrid>
        <MuiGrid lg={6} xs={0} item />
        <MuiGrid lg={2} xs={12} item>
          <DatePicker
            name="dueDate"
            title="Due Date"
            value={task.dueDate}
            onChange={handleDateChange}
          />
        </MuiGrid>
        <MuiGrid lg={10} xs={12} item />
        <MuiGrid item>
          <SaveButton label="Create" onClick={handleSave} />
        </MuiGrid>
        <MuiGrid item>
          <CancelButton label="Cancel" onClick={handleCancel} />
        </MuiGrid>
      </MuiGrid>
    </MuiGrid>
  );
}

export default TaskForm;
