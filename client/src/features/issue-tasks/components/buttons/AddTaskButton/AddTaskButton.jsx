import React, { useState } from 'react';

import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import MuiButton from '@mui/material/Button';
import MuiTypography from '@mui/material/Typography';

import MuiAddIcon from '@mui/icons-material/Add';
import TaskForm from '../../forms/TaskForm';

const AddTaskButton = styled(MuiButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textTransform: 'none',
  textAlign: 'left',
  justifyContent: 'left',
  fontWeight: 500,
  '&:hover': {
    color: theme.palette.text.primary,
  },
}));

function AddTask() {
  const [open, setOpen] = useState(false);

  return (
    <MuiGrid container>
      {open ? (
        <TaskForm setOpen={setOpen} />
      ) : (
        <MuiGrid xs={12} item>
          <AddTaskButton
            startIcon={<MuiAddIcon />}
            disableRipple
            fullWidth
            onClick={() => setOpen(true)}
          >
            <MuiTypography variant="body2">Add a Task</MuiTypography>
          </AddTaskButton>
        </MuiGrid>
      )}
    </MuiGrid>
  );
}

export default AddTask;
