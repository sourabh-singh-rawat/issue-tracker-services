import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { formatISO } from "date-fns";

import { styled } from "@mui/material/styles";
import MuiGrid from "@mui/material/Grid";
import MuiButton from "@mui/material/Button";
import MuiTypography from "@mui/material/Typography";

import MuiAddIcon from "@mui/icons-material/Add";

import DatePicker from "../../../../../common/dates/DatePicker";
import TextField from "../../../../../common/textfields/TextField";
import SaveButton from "../../../../../common/buttons/SaveButton";
import CancelButton from "../../../../../common/buttons/CancelButton";

import { useCreateTaskMutation } from "../../../api/issue-tasks.api";
import { setTasksLoading } from "../../../slice/issue-tasks.slice";

const AddTaskButton = styled(MuiButton)(({ theme }) => {
  return {
    color: theme.palette.text.secondary,
    textTransform: "none",
    textAlign: "left",
    justifyContent: "left",
    fontWeight: 500,
    "&:hover": {
      color: theme.palette.text.primary,
    },
  };
});

const AddTask = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [createTask] = useCreateTaskMutation();

  const [open, setOpen] = useState(false);
  const defaultDueDate = formatISO(new Date());
  const [task, setTask] = useState({
    description: "",
    dueDate: defaultDueDate,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleDateChange = (selectedDate) => {
    setTask({ ...task, dueDate: selectedDate });
  };

  const handleCancel = (e) => {
    setOpen(false);
  };

  const handleSave = () => {
    if (task.description.length > 0) {
      const { description, dueDate } = task;
      createTask({ issueId: id, description, dueDate, completed: false });
      dispatch(setTasksLoading());
    }
    // Resetting the task state after saving
    setTask({ ...task, dueDate: defaultDueDate, description: "" });
    setOpen(false);
  };

  return (
    <MuiGrid container>
      {open ? (
        <MuiGrid item xs={12}>
          <MuiGrid container rowSpacing={1} columnSpacing={1}>
            <MuiGrid item xs={12}>
              <TextField
                size="small"
                name="description"
                placeholder="Add a Task"
                onChange={handleChange}
                autoFocus
                fullWidth
              />
            </MuiGrid>
            <MuiGrid item>
              <MuiTypography variant="body2">Due Date:</MuiTypography>
            </MuiGrid>
            <MuiGrid item>
              <DatePicker
                name="dueDate"
                value={task.dueDate}
                onChange={handleDateChange}
              />
            </MuiGrid>
            <MuiGrid item>
              <SaveButton label="Create" onClick={handleSave} />
            </MuiGrid>
            <MuiGrid item>
              <CancelButton label="Cancel" onClick={handleCancel} />
            </MuiGrid>
          </MuiGrid>
        </MuiGrid>
      ) : (
        <MuiGrid item xs={12}>
          <AddTaskButton
            onChange={handleChange}
            onClick={() => setOpen(true)}
            startIcon={<MuiAddIcon />}
            fullWidth
            disableRipple
          >
            <MuiTypography variant="body2">Add a Task</MuiTypography>
          </AddTaskButton>
        </MuiGrid>
      )}
    </MuiGrid>
  );
};

export default AddTask;
